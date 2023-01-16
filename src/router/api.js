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

module.exports = router;