import pool from "../configs/DBconnect"
const multer = require('multer');
const path = require('path');
const fs = require('fs');
let getUserManagerPage = async (req, res) => {
    const [rows, fields] = await pool.execute('SELECT * FROM user');
    return res.render("./userManagerPage.ejs", { dataUser: rows })
}

let getDetailPage = async (req, res) => {
    let id = req.params.userId;
    const [rows, fields] = await pool.execute('SELECT * FROM user WHERE id =?', [id]);
    // console.log(rows);
    return res.send(JSON.stringify(rows[0]))
}

let createNewUser = async (req, res) => {

    let upload = multer({ storage: storage, fileFilter: imageFilter }).single('avatar');
    await upload(req, res, function (err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }
        let { email, address, firstName, lastName } = req.body;
        let avatar = req.file.filename;
        pool.execute('INSERT INTO user (email, address, firstName, lastName, avatar) VALUES (?, ?, ?,?,?);',
            [email, address, firstName, lastName, avatar]);
        return res.redirect("/users")
    });

}

let deleteUser = async (req, res) => {
    let id = req.body.id;

    await pool.execute('DELETE FROM user WHERE id = ?;',
        [id]);

    return res.redirect('/users')
}

let getPageEditUser = async (req, res) => {
    let id = req.params.id;
    const [rows, fields] = await pool.execute('SELECT * FROM user WHERE id =?', [id]);
    // console.log(rows);
    return res.render('./updateUser.ejs', { user: rows[0] })
}

let postUpdateUser = async (req, res) => {

    let upload = multer({ storage: storage, fileFilter: imageFilter }).single('avatar');
    await upload(req, res, function (err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }
        let { oldAvatar, id, email, address, firstName, lastName } = req.body;
        let avatar = req.file.filename;

        fs.unlink('src/public/avatarUser/' + oldAvatar, (err) => {
            if (err) {
                throw err;
            }

            console.log("Delete File successfully.");
        });
        pool.execute('UPDATE user SET email = ?,address =?, firstName = ?, lastName = ?, avatar = ? WHERE id = ?;',
            [email, address, firstName, lastName, avatar, id]);
        return res.redirect('/users')
    });
}


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/public/avatarUser');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};




module.exports = {
    getUserManagerPage, getDetailPage, createNewUser, deleteUser, getPageEditUser, postUpdateUser,
}

