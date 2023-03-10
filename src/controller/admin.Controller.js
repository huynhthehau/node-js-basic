import pool from "../configs/DBconnect"
import bcrypt from "bcryptjs"
const Admin = require('../model/admin.model')
require("dotenv").config();
import jwt from "jsonwebtoken"

let registerAdmin = async (req, res) => {
    let { account, password, avatar } = req.body;
    const [rows, fields] = await pool.execute('SELECT * FROM admin where account = ?', [account]);
    if (rows.length != 0) {
        res.status(422).send('Email is exist')
    }
    const salt = await bcrypt.genSaltSync(10);
    const hashPass = await bcrypt.hashSync(password, salt);
    const admin = new Admin({
        account: account,
        password: hashPass,
        avatar: avatar
    })
    try {
        await pool.execute('INSERT INTO admin (account, password, avatar) VALUES (?,?,?);', [admin.account, admin.password, admin.avatar]);
        res.send(admin)
    } catch (err) {
        res.status(400).send(err);
    }
}


let loginAdmin = async (req, res) => {
    let { account, password } = req.body
    const [rows, fields] = await pool.execute('SELECT * FROM admin where account = ?', [account]);
    if (rows.length == 0) {
        res.status(422).send('Account or Password is not correct')
    }
    const checkPassword = await bcrypt.compareSync(password, rows[0].password);
    if (!checkPassword) {
        res.status(422).send('Account or Password is not correct')
    }
    console.log(rows[0].id)
    // const token = jwt.sign({ id: rows[0].id }, process.env.TOKEN_SECRET, { expiresIn: 60 * 60 * 24 });
    const token = jwt.sign({
        exp: 60 * 60 * 24,
        data: rows[0].id
    }, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(`User ${rows[0].account} has logged in`);
    // return res.send(`User ${rows[0].account} has logged in`);

}

module.exports = {
    loginAdmin, registerAdmin
}

