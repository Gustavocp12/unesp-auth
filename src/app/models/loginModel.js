const connection = require('./connection');
const bcrypt = require('bcrypt');

const createLogin = async (name, email, password, role) => {

    try{
        const createdIn = new Date();
        const hash = bcrypt.hashSync(password, 10);

        const sql = 'INSERT INTO login (name, email, password, role, createdIn) VALUES (?, ?, ?, ?, ?)';
        const [result] = await connection.execute(sql, [name, email, hash, role, createdIn]);
        return result;
    }catch(error){
        throw new Error(error);
    }

}

const login = async (email, password) => {

    try{
        const hash = bcrypt.hashSync(password, 10);

        const sql = 'SELECT * FROM login WHERE email = ? AND password = ?';
        const [result] = await connection.execute(sql, [email, hash]);
        return result;
    }catch(error){
        throw new Error(error);
    }

}

module.exports = {
    createLogin,
    login
}