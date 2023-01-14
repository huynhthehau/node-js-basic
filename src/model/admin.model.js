import pool from '../configs/DBconnect'

const Admin = function (admin) {

    this.account = admin.account;
    this.password = admin.password;
    this.avatar = admin.avatar;
};

module.exports = Admin