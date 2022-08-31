const { Op } = require('sequelize')
const { User, Task, UserTask } = require("../models")


class TaskController {
    async createTask(req, res) {
        try {
            const { name, description, priority, status, deadline } = req.body
            const task = await Task.create({ name, description, priority, status, deadline })
            await UserTask.create({ userId: req.user.id, taskId: task.id })
            return res.json(task);
        } catch (e) {
            console.log(e)
            return res.status(400).json(e)
        }
    }

    async getTasks(req, res) {
        try {
            const startDate = req.query.startDate;
            const endDate = req.query.endDate;
            const tasks = await Task.findAll({
                include: {
                    model: User,
                    where: {
                        id: req.user.id
                    },
                    attributes: ['firstName'],
                },
                where: {
                    deadline: {
                        [Op.between]: [startDate, endDate]
                    }
                }
            })
            return res.json(tasks);
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
            return res.json({ message: 'Task was deleted'});
        } catch (e) {
            console.log(e)
        }
    }

    async updateTask(req, res) {
        try {
            const { id, priority, status } = req.body
            const task = await Task.findOne({
                include: {
                    model: User,
                    where: {
                        id: req.user.id
                    },
                    attributes: ['firstName'],
                },
                where: {
                    id: id
                }
            })
            await task.update({
                priority: priority,
                status: status,
            })
            await task.save()
            return res.json(task);
        } catch (e) {
            console.log(e)
            return res.status(400).json(e)
        }
    }

    async searchTasks(req, res) {
        try {
            const searchName = req.query.search;
            const tasks = await Task.findAll({
                include: {
                    model: User,
                    where: {
                        id: req.user.id
                    },
                },
                where: {
                    name: {
                        [Op.like]: `%${searchName}%`
                    }
                }
            })
            return res.json(tasks);
        } catch (e) {
            console.log(e)
            return res.status(400).json({ message: 'Search error' })
        }
    }
}

module.exports = new TaskController();