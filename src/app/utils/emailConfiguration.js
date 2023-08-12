const speakeasy = require("speakeasy");
const nodemailer = require("nodemailer");
const sendOtpEmail = async (email) => {
    const secret = speakeasy.generateSecret({ length: 20 });
    const otp = speakeasy.totp({
        secret: secret.base32,
        encoding: 'base32'
    });

    const transporter = nodemailer.createTransport({

        service: 'gmail',
        auth: {
            user: 'seu-email@gmail.com',
            pass: 'sua-senha'
        }
    });

    const mailOptions = {
        from: 'seu-email@gmail.com',
        to: email,
        subject: 'Código de Verificação',
        text: `Seu código de verificação é ${otp}`
    };

    await transporter.sendMail(mailOptions);

    return secret.base32;
};

module.exports = {
    sendOtpEmail
}