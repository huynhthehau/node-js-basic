const http = require('http')

const sever = http.createServer((req, res) => {
    console.log("run request...")
    res.setHeader('Content-Type', 'text/html')
    res.write("<h1>Hello world!</h1>")
    res.end()
})

sever.listen(3000, "localhost", () => {
    console.log('Node.JS sever is running on port: 3000')
})