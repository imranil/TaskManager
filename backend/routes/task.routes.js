const Router = require('express');
const router = new Router();
const authMiddleware = require('../middleware/auth.middleware');
const taskController = require('../controllers/taskController')

router.post('/create', authMiddleware, taskController.createTask)
router.get('', authMiddleware, taskController.getTasks)
router.get('/search', authMiddleware, taskController.searchTasks)
router.put('/update', authMiddleware, taskController.updateTask)
router.delete('', authMiddleware, taskController.deleteTask)

module.exports = router;