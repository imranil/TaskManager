const { Op, QueryTypes } = require('sequelize')
const { User, Task, UserTask, Tag, sequelize } = require("../models")
const ApiError = require('../error/ApiError')


class TaskController {
    async createTask(req, res, next) {
        try {
            const { name, description, priority, status, deadline } = req.body
            const task = await Task.create({ name, description, priority, status, deadline })
            await UserTask.create({ userId: req.user.id, taskId: task.id, role: 'creator'})
            const createdTask = await Task.findByPk(task.id, {
                include: [
                    {model: User, attributes: ['avatar', 'fullName']},
                    {model: Tag, attributes: ['id', 'name']}
                ],
            })
            return res.status(201).json(createdTask);
        } catch (e) {
            console.log(e)
            return next(ApiError.badRequest('Некорректный запрос!'))
        }
    }

    async getTasks(req, res, next) {
        try {
            const { startDate, endDate, priorities, statuses } = req.query;
            const prioritiesArray = priorities ? JSON.parse(priorities) : ['low', 'medium', 'high'];
            const statusesArray = statuses ? JSON.parse(statuses) : ['in progress', 'closed', 'frozen'];

            const tasks = await Task.findAll({
                include: [
                    {model: User, attributes: ['avatar', 'fullName']},
                    {model: Tag, attributes: ['id', 'name']}
                ],
                where: {
                    id: { [Op.in]: sequelize.literal(`(SELECT usertasks.taskId FROM usertasks INNER JOIN users ON users.id=usertasks.userId WHERE users.id=${req.user.id})`) },
                    deadline: { [Op.between]: [startDate, endDate] },
                    priority: { [Op.in]: prioritiesArray},
                    status: { [Op.in]: statusesArray},
                },
            })
            
            return res.status(200).json(tasks);
        } catch (e) {
            console.log(e)
            return next(ApiError.badRequest('Некорректный запрос!'))
        }
    }

    async deleteTask(req, res, next) {
        try {
            const task = await Task.findOne({
                include: {
                    model: User,
                    where: {
                        id: req.user.id
                    },
                    attributes: [],
                },
                where: {
                    id: req.query.id
                }
            })
            await task.destroy()
            return res.json({ message: 'Задача была удалена.' });
        } catch (e) {
            console.log(e)
            return next(ApiError.badRequest('Некорректный запрос!'))
        }
    }

    async updateTask(req, res, next) {
        try {
            const { id, priority, status } = req.body
            const task = await Task.findOne({
                include: [
                    {model: User, attributes: ['avatar', 'fullName']},
                    {model: Tag, attributes: ['id', 'name']}
                ],
                where: {
                    id: id
                },
            })
            await task.update({
                priority: priority,
                status: status,
            })
            await task.save()
            return res.status(200).json(task);
        } catch (e) {
            console.log(e)
            return next(ApiError.badRequest('Некорректный запрос!'))
        }
    }

    async searchTasks(req, res, next) {
        try {
            const search = req.query.search;
            const tasks = await Task.findAll({
                include: [
                    {model: User, attributes: ['avatar', 'fullName']},
                    {model: Tag, attributes: ['id', 'name']}
                ],
                where: {
                    id: { [Op.in]: sequelize.literal(`(SELECT usertasks.taskId FROM usertasks INNER JOIN users ON users.id=usertasks.userId WHERE users.id=${req.user.id})`) },
                    [Op.or]: [{ name: { [Op.like]: `%${search}%` } }, { description: { [Op.like]: `%${search}%` } }, { deadline: { [Op.like]: `%${search}%` }, }]
                },
                order: [['deadline', 'DESC']],
                limit: 10
            })
            return res.json(tasks);
        } catch (e) {
            console.log(e)
            return next(ApiError.badRequest('Некорректный запрос!'))
        }
    }

    async getCounts(req, res) {
        try {
            const counts = await sequelize.query(`
                SELECT
                    month(deadline) AS 'month',
                    count(if(status='in progress', 1, NULL)) AS 'inProgressCounts',
                    count(if(status='closed', 1, NULL)) AS 'closedCounts',
                    count(if(status='frozen', 1, NULL)) AS 'frozenCounts'
                FROM tasks, usertasks 
                WHERE tasks.id=usertasks.taskId AND usertasks.userId=${req.user.id}
                GROUP BY month
                ORDER BY month ASC`, {
                type: QueryTypes.SELECT,
            })
            return res.json(counts);
        } catch (e) {
            console.log(e)
            return next(ApiError.internal('Внутренняя ошибка сервера!'))
        }
    }
}

module.exports = new TaskController();