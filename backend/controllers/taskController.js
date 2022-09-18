const { Op, QueryTypes } = require('sequelize')
const { User, Task, UserTask, Tag, sequelize } = require("../models")


class TaskController {
    async createTask(req, res) {
        try {
            const { name, description, priority, status, deadline } = req.body
            const task = await Task.create({ name, description, priority, status, deadline })
            UserTask.create({ userId: req.user.id, taskId: task.id, role: 'creator' })
            return res.status(201).json(task);
        } catch (e) {
            console.log(e)
            return res.status(400).json(e)
        }
    }

    async getTasks(req, res) {
        try {
            const { startDate, endDate, priority, status } = req.query;
            let tasks;
            if (priority) {
                tasks = await Task.findAll({
                    include: [
                        {model: User, attributes: ['avatar', 'fullName']},
                        {model: Tag, attributes: ['name']}
                    ],
                    where: {
                        id: { [Op.in]: sequelize.literal(`(SELECT usertasks.taskId FROM usertasks INNER JOIN users ON users.id=usertasks.userId WHERE users.id=${req.user.id})`) },
                        deadline: { [Op.between]: [startDate, endDate] },
                        priority: priority
                    },
                })
            }
            if (status) {
                tasks = await Task.findAll({
                    include: [
                        {model: User, attributes: ['avatar', 'fullName']},
                        {model: Tag, attributes: ['name']}
                    ],
                    where: {
                        id: { [Op.in]: sequelize.literal(`(SELECT usertasks.taskId FROM usertasks INNER JOIN users ON users.id=usertasks.userId WHERE users.id=${req.user.id})`) },
                        deadline: { [Op.between]: [startDate, endDate] },
                        status: status
                    },
                })
            }
            if (priority && status) {
                tasks = await Task.findAll({
                    include: [
                        {model: User, attributes: ['avatar', 'fullName']},
                        {model: Tag, attributes: ['name']}
                    ],
                    where: {
                        id: { [Op.in]: sequelize.literal(`(SELECT usertasks.taskId FROM usertasks INNER JOIN users ON users.id=usertasks.userId WHERE users.id=${req.user.id})`) },
                        deadline: { [Op.between]: [startDate, endDate] },
                        priority: priority,
                        status: status
                    },
                })
            }
            if (!priority && !status) {
                tasks = await Task.findAll({
                    include: [
                        {model: User, attributes: ['avatar', 'fullName']},
                        {model: Tag, attributes: ['name']}
                    ],
                    where: {
                        id: { [Op.in]: sequelize.literal(`(SELECT usertasks.taskId FROM usertasks INNER JOIN users ON users.id=usertasks.userId WHERE users.id=${req.user.id})`) },
                        deadline: { [Op.between]: [startDate, endDate] },
                    },
                })
            }
            return res.status(200).json(tasks);
        } catch (e) {
            console.log(e)
        }
    }

    async deleteTask(req, res) {
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
            return res.json({ message: 'Task was deleted' });
        } catch (e) {
            console.log(e)
        }
    }

    async updateTask(req, res) {
        try {
            const { id, priority, status } = req.body
            const task = await Task.findOne({
                include: [
                    {model: User, attributes: ['avatar', 'fullName']},
                    {model: Tag, attributes: ['name']}
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
            return res.status(400).json(e)
        }
    }

    async searchTasks(req, res) {
        try {
            const search = req.query.search;
            const tasks = await Task.findAll({
                include: [
                    {model: User, attributes: ['avatar', 'fullName']},
                    {model: Tag, attributes: ['name']}
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
            return res.status(400).json({ message: 'Search error' })
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
        }
    }
}

module.exports = new TaskController();