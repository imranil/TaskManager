const { Tag, Task, TaskTag, User } = require("../models")


class TagController {
    async createTag(req, res) {
        try {
            const { name, taskId } = req.body
            const tag = await Tag.create({ userId: req.user.id, name: name })
            await TaskTag.create({ taskId: taskId, tagId: tag.id})
            const task = await Task.findOne({
                include: [
                    {model: User, attributes: ['avatar', 'fullName']},
                    {model: Tag, attributes: ['name']}
                ],
                where: { id: taskId}
            })
            return res.status(201).json(task);
        } catch (e) {
            console.log(e)
            return res.status(400).json(e)
        }
    }

    async getTags(req, res) {
        try {
            const tags = await Tag.findAll({
                attributes: ['name'],
                where: {
                    userId: req.user.id
                }
            })
            return res.json(tags);
        } catch (e) {
            console.log(e)
            return res.status(400).json(e)
        }
    }
}

module.exports = new TagController();