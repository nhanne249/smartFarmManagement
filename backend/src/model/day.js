import mongoose from "mongoose";

const Schema = mongoose.Schema;

const DayReport = new Schema({
    day: Date,
    data: [{ temperature: Number, humidity: Number }]
})

export default mongoose.model('DayReport', DayReport);