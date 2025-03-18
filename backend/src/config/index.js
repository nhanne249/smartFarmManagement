const mongoose = require('mongoose')

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/DayReport')
        console.log("connect to database successful")
    } catch (error) {
        console.log("connect to database failed")
    }
}

module.exports = { connect }