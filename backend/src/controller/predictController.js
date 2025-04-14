require('dotenv').config()
const DayReport = require("../model/day")
const client = require("../mqtt/index")
const { exec } = require('child_process')
const path = require('path')

const bbc_fan = process.env.BBC_FAN
const bbc_pump = process.env.BBC_PUMP

const predict = {
    predict_temp: async (req, res) => {
        data = JSON.stringify(await DayReport.find().lean())
        const pythonPath = path.join(__dirname, '../predict_temp/predict.py')
        // exec(`py -3.12 ${pythonPath} '${data}'`, (error, stdout, stderr) => {
        //     if (error) {
        //         console.error(`exec error: ${error}`);
        //         return
        //     }
        //     if (stderr) {
        //         console.error(`stderr: ${stderr}`);
        //         return
        //     }
        //     console.log(stdout)
        // })
    }
}

module.exports = predict;