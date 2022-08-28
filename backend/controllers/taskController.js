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
                    attributes: [],
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

    async getTask(req, res) {
        try {
            console.log(req)
            const task = await Task.findOne({
                include: {
                    model: User,
                    where: {
                        id: req.user.id
                    },
                    attributes: [],
                },
                where: {
                    id: req.params.id
                }
            })
            return res.json(task);
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new TaskController();