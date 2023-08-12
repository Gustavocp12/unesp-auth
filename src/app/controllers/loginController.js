const loginModel = require('../models/loginModel');
const emailConfiguration = require('../utils/emailConfiguration');
const jwt = require('jsonwebtoken');
const config = require('../../../config');
const speakeasy = require('speakeasy');

const createLogin = async (req, res) => {

    try{
        const { name, email, password, role } = req.body;
        const secret = await emailConfiguration.sendOtpEmail(email);
        const result = await loginModel.createLogin(name, email, password, role, secret);

        return res.status(201).json({ message: 'Login criado com sucesso!', result });
    }catch(error){
        return res.status(500).json({ message: 'Erro ao criar login!', error });
    }
}

const login = async (req, res) => {

    try {
        const { email, password } = req.body;
        const result = await loginModel.login(email, password);

        if(result.length === 0){
            return res.status(404).json({ message: 'E-mail ou senha incorretos!' });
        }

        const { id, name, role } = result[0];
        const token = jwt.sign({ id, name, email, role }, config.JWT_SECRET);

        return res.status(200).json({ message: 'Login realizado com sucesso!', token });
    }catch(error) {
        return res.status(500).json({ message: 'Erro ao realizar login!', error });
    }
}

const verifyOtp = async (req, res) => {
    const { otp, email } = req.body;
    const user = await loginModel.getUserByEmail(email);
    const secret = user.secret;

    const valid = speakeasy.totp.verify({
        secret: secret,
        encoding: 'base32',
        token: otp
    });

    if (valid) {
        return res.status(200).json({ message: 'Conta verificada com sucesso!' });
    } else {
        return res.status(400).json({ message: 'Código de verificação inválido!' });
    }
};

module.exports = {
    createLogin,
    login,
    verifyOtp
}