
import express from "express";
const app = express()
import configViewEngine from "./configs/viewEngine";
import router from "./router/index"

import session from "express-session"

require("dotenv").config();

const port = process.env.PORT || 8080;

//middleware to parse JSON data from request
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(session({
    secret: 'keyboard cat',
    resave: false, // đặt lại cookie cho mỗi req ex:
    saveUninitialized: false, // tạo 1 cookie connect.sid
    cookie: { secure: false, maxAge: 5 * 60 * 1000 }
}))

//setup view engine
configViewEngine(app)
//init route
router(app)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})