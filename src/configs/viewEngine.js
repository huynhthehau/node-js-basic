import express from "express"

const configViewEngine = app => {
    app.use('/static', express.static('./src/public'))
    // serve static files such as images, CSS files, and JavaScript files
    app.set("view engine", "ejs")
    // Set view engine
    app.set("views", "./src/views")
    // find file ejs
}

export default configViewEngine
