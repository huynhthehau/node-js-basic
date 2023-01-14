
import express from "express";
const app = express()
import configViewEngine from "./configs/viewEngine";
import router from "./router/index"
require("dotenv").config();

const port = process.env.PORT || 8080;

//middleware to parse JSON data from request
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// app.use((req, res) => {
//     res.send(req.session.error)
// })

//setup view engine
configViewEngine(app)
//init route
router(app)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})