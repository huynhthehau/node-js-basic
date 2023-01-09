
import express from "express";
const app = express()

import configViewEngine from "./configs/viewEngine";

require("dotenv").config();
const port = process.env.PORT || 3000;

configViewEngine(app)
app.get('/', (req, res) => {
    res.render("index.ejs")
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})