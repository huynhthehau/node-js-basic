import express from "express"
import homeController from "../controller/homeController"
import userController from "../controller/userController"
let router = express.Router()


const initWebRoute = app => {
    router.get('/home', homeController.getHomePage)
    router.get('/users', userController.getUserManagerPage)
    router.get('/users/detail/:userId', userController.getDetailPage)
    // router.post('/users/create_user', userController.createNewUser)
    router.post('/users/create_user', userController.createNewUser)
    router.post('/users/delete_user', userController.deleteUser)
    router.get('/users/edit_user/:id', userController.getPageEditUser)
    router.post('/users/update_user', userController.postUpdateUser)

    return app.use('/', router)
}

export default initWebRoute;
