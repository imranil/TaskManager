const Router = require('express');
const router = new Router();
const authMiddleware = require('../middleware/auth.middleware');
const inviteController = require('../controllers/inviteController')

router.post('/create', authMiddleware, inviteController.createInvitation)
router.post('/accept', authMiddleware, inviteController.acceptInvitation)
router.get('/', authMiddleware, inviteController.getInvitations)
router.delete('/', authMiddleware, inviteController.declineInvitation)

module.exports = router;