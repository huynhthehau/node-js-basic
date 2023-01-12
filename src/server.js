
import express from "express";
const app = express()
import configViewEngine from "./configs/viewEngine";
import initWebRoute from "./route/web"
require("dotenv").config();

const port = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//setup view engine
configViewEngine(app)
//init web route
initWebRoute(app)
//error pages
app.get('*', (req, res) => {
    res.status(404).render('./errorPage');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})