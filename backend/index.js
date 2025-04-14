const express = require('express')
const app = express()
const port = 3000

const database = require("./src/config/index")
database.connect()

const route = require("./src/route/index")
route(app)

app.listen(port, () => {
    console.log(`App now run on: http://localhost:${port}`)
})