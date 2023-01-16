import express from "express";
import adminController from '../controller/admin.Controller'
import userController from '../controller/user.Controller'
const router = express.Router();
import middleware from '../configs/middleware'

router.post('/register', adminController.registerAdmin)
router.post('/login', adminController.loginAdmin)
router.get('/user/getAllUser', middleware.verifyToken, userController.getAllUser)
router.get('/user/search/:query?', middleware.verifyToken, userController.searchUser)
module.exports = router;