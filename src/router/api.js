import express from "express";
import adminController from '../controller/admin.Controller'
const router = express.Router();

router.post('/register', adminController.registerAdmin)
router.post('/login', adminController.loginAdmin)

module.exports = router;