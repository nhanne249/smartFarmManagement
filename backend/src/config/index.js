const mongoose = require('mongoose')
require('dotenv').config();
url = process.env.MONGO_URL
async function connect() {
    try {
        await mongoose.connect(url)
        console.log("connect to database successful")
    } catch (error) {
        console.log("connect to database failed")
    }
}

module.exports = { connect }