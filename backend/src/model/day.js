const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const DayReport = new Schema({
    day: Date,
    data: [{ temperature: Number, humidity: Number }]
})

module.exports = mongoose.model('DayReport', DayReport);