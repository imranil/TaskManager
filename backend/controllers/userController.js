const fs = require('fs');
const Uuid = require('uuid');
const config = require('config')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { User } = require('../models');
const ApiError = require('../error/ApiError');

class UserController {
    async registration(req, res, next) {
        try {
            const { email, password, firstName, lastName } = req.body
            const candidate = await User.findOne({
                where: { email: email },
            })
            if (candidate) {
                return next(ApiError.badRequest(`Пользователь с адресом электронной почты ${email} уже существует!`))
            }
            const hashPassword = await bcrypt.hash(password, 8)
            const user = await User.build({ email: email, password: hashPassword, firstName: firstName, lastName: lastName })
            await user.save()
            return res.status(201).json({ message: "User was created" })
    
        } catch (e) {
            console.log(e)
            return next(ApiError.internal('Внутренняя ошибка сервера!'))
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body
            const user = await User.findOne({
                where: { email: email }
            })
            if (!user) {
                return next(ApiError.notFound(`Пользователь с адресом электронной почты ${email} не найден!`))
            }
            const isPassValid = bcrypt.compareSync(password, user.password)
            if (!isPassValid) {
                return next(ApiError.badRequest(`Неверный пароль!`))
            }
            const token = jwt.sign({ id: user.id }, config.get('secretKey'), { expiresIn: "8h" })
            return res.status(200).json({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    avatar: user.avatar
                }
            })
        } catch (e) {
            console.log(e)
            return next(ApiError.internal('Внутренняя ошибка сервера!'))
        }
    }

    async uploadAvatar(req, res) {
        try {
            const file = req.files.file
            const user = await User.findByPk(req.user.id)
            const avatarName = Uuid.v4() + ".jpg"
            file.mv(config.get('staticPath') + '\\' + avatarName)
            if (user.avatar) {
                fs.unlinkSync(config.get('staticPath') + '\\' + user.avatar)
            }
            user.avatar = avatarName
            await user.save()
            return res.status(200).json(user)
        } catch (e) {
            console.log(e)
            return next(ApiError.internal('Внутренняя ошибка сервера!'))
        }
    }

    async deleteAvatar(req, res) {
        try {
            const user = await User.findByPk(req.user.id)
            fs.unlinkSync(config.get('staticPath') + '\\' + user.avatar)
            user.avatar = null
            await user.save()
            return res.status(200).json(user)
        } catch (e) {
            console.log(e)
            return next(ApiError.internal('Внутренняя ошибка сервера!'))
        }
    }

    async auth(req, res) {
        try {
            const user = await User.findByPk(req.user.id)
            const token = jwt.sign({ id: user.id }, config.get('secretKey'), { expiresIn: "1h" })
            return res.status(200).json({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    avatar: user.avatar
                }
            })
        } catch (e) {
            console.log(e)
            return next(ApiError.internal('Внутренняя ошибка сервера!'))
        }
    }
}

module.exports = new UserController();