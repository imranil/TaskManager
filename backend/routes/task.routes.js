const Router = require('express');
const router = new Router();
const authMiddleware = require('../middleware/auth.middleware');
const taskController = require('../controllers/taskController')

router.post('/create', authMiddleware, taskController.createTask)
router.put('/update', authMiddleware, taskController.updateTask)
router.get('', authMiddleware, taskController.getTasks)
router.get('/:id', authMiddleware, taskController.getTask)
router.delete('/', authMiddleware, taskController.deleteTask)

module.exports = router;