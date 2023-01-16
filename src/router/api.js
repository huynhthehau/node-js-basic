import express from "express";
import adminController from '../controller/admin.Controller'
import userController from '../controller/user.Controller'
const router = express.Router();
import middleware from '../configs/middleware'

router.post('/register', adminController.registerAdmin)
router.post('/login', adminController.loginAdmin)
router.get('/user/getAllUser', middleware.verifyToken, userController.getAllUser)
router.get('/user/search/:query?', middleware.verifyToken, userController.searchUser)

router.get('/get-session', (req, res) => {
    res.send(req.session)
})
router.get('/set-session', (req, res) => {
    req.session.user = {
        email: "thehauhuynh5@gmail.com",
        age: 21,
        avatar: "#"
    }
    res.send('set session!!')
})

router.get('/download/:file(*)', (req, res) => {
    res.download(req.params.file, { root: __dirname }, function (err) {
        if (!err) return; // file sent
        if (err.status !== 404) return next(err); // non-404 error
        // file for download not found
        res.statusCode = 404;
        res.send('Cant find that file, sorry!');
    });
})

module.exports = router;