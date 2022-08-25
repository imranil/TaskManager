const Router = require('express');
const router = new Router();
const authMiddleware = require('../middleware/auth.middleware');
const taskController = require('../controllers/taskController')

router.post('', authMiddleware, taskController.createTask)
router.get('', authMiddleware, taskController.getTasks)

module.exports = router;