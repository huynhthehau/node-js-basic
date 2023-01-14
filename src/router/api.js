import express from "express";
import adminController from '../controller/admin.Controller'
import userController from '../controller/user.Controller'
const router = express.Router();

router.post('/register', adminController.registerAdmin)
router.post('/login', adminController.loginAdmin)
router.get('/getAllUser', userController.getAllUser)
router.get('/search/:query?', userController.searchUser)
module.exports = router;