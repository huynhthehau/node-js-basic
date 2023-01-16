import express from "express"
import homeController from "../controller/home.Controller"
import userController from "../controller/user.Controller"
const router = express.Router()


router.get('/home', homeController.getHomePage)
router.get('/users', userController.getUserManagerPage)
router.get('/users/detail/:userId', userController.getDetailPage)
// router.post('/users/create_user', userController.createNewUser)
router.post('/users/create_user', userController.createNewUser)
router.post('/users/delete_user', userController.deleteUser)
router.get('/users/edit_user/:id', userController.getPageEditUser)
router.post('/users/update_user', userController.postUpdateUser)


router.get('*', (req, res) => {
    res.status(404).render('./errorPage');
});

module.exports = router;
