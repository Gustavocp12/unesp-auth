const express = require('express');
const LoginController = require('../controllers/loginController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/create', authMiddleware, LoginController.createLogin);
router.post('/login', authMiddleware, LoginController.login);

module.exports = router;
