const { Op, QueryTypes } = require('sequelize')
const { User, Task, UserTask, Invitation, sequelize } = require("../models")


class InviteController {
    async createInvitation(req, res) {
        try {
            const { receiverEmail, taskId } = req.body
            const receiver = await User.findOne({
                where: {
                    email: receiverEmail
                }
            })
            const task = await Task.findByPk(taskId)
            if(!receiver || !task) {
                return res.status(404).json({message: `Resources not found`})
            }
            await Invitation.create({ senderId: req.user.id, receiverId: receiver.id, taskId: task.id })
            return res.status(201).json({message: `Приглашение отправлено ${receiver.email}`});
        } catch (e) {
            console.log(e)
            return res.status(400).json(e)
        }
    }

    async getInvitations(req, res) {
        try {
            const invitations = await Invitation.findAll({
                attributes: {
                    include: [
                        [sequelize.literal(`(SELECT name FROM tasks WHERE taskId=tasks.id)`), 'taskName'],
                        [sequelize.literal(`(SELECT firstName FROM users WHERE senderId=users.id)`), 'senderName']
                    ],
                },
                where: { receiverId: req.user.id },
                order: [['createdAt', 'DESC']]
            })
            return res.json(invitations);
        } catch (e) {
            console.log(e)
            return res.status(400).json(e)
        }
    }

    async acceptInvitation(req, res) {
        try {
            const { invitationId, taskId } = req.body
            const invitation = await Invitation.findByPk(invitationId)
            const task = await Task.findOne({
                include: {
                    model: User,
                    attributes: ['firstName'],
                },
                where: {
                    id: taskId
                }
            })
            if(!invitation || !task) {
                return res.status(404).json({message: `Resources not found`})
            }
            invitation.destroy()
            await UserTask.create({ userId: req.user.id, taskId: task.id, role: 'contributor' })
            return res.status(200).json(task)
        } catch(e) {
            console.log(e)
            return res.status(400).json(e)
        }
    }

    async declineInvitation(req, res) {
        try {
            const invitation = await Invitation.findOne({
                where: {
                    id: req.query.id,
                    receiverId: req.user.id
                }
            })
            if(!invitation) {
                return res.status(404).json({message: `Resources not found`})
            }
            invitation.destroy()
            return res.status(204)
        } catch(e) {
            console.log(e)
            return res.status(400).json(e)
        }
    }
}

module.exports = new InviteController();