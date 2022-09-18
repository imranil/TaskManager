const Router = require('express');
const router = new Router();
const authMiddleware = require('../middleware/auth.middleware');
const tagController = require('../controllers/tagController')


router.post('/', authMiddleware, tagController.createTag)
router.get('/', authMiddleware, tagController.getTags)

module.exports = router;