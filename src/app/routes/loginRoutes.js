const express = require('express');
const LoginController = require('../controllers/loginController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/create', LoginController.createLogin);
router.post('/login', authMiddleware, LoginController.login);
router.post('/verify-otp', LoginController.verifyOtp);

module.exports = router;
