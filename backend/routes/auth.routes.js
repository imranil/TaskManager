const Router = require('express');
const authMiddleware = require('../middleware/auth.middleware')
const router = new Router();
const userController = require('../controllers/userController')


router.post('/registration', userController.registration);

router.post('/login', userController.login);

router.post('/avatar', authMiddleware, userController.uploadAvatar);

router.delete('/avatar', authMiddleware, userController.deleteAvatar);

router.get('/auth', authMiddleware, userController.auth);


module.exports = router;