require('dotenv').config()
const DayReport = require("../model/day")
const client = require("../mqtt/index")

<<<<<<< HEAD:backend/src/controller/sendController.js
const bbc_fan = process.env.BBC_FAN
const bbc_pump = process.env.BBC_PUMP

const send = {
    api_fan_send: async (req, res) => {
        data = 0
        if (req.query.data == "true") {
            data = 1
        }
        data = JSON.stringify(parseInt(data))
        client.publish(bbc_fan, data)
    },
    api_pmup_send: async (req, res) => {
        data = 0
        if (req.query.data == "true") {
            data = 1
        }
=======
const bbc_pump = process.env.BBC_FAN

const control = {
    fan: async (req, res) => {
        data = JSON.stringify(parseInt(req.query.data))
        client.publish(bbc_fan, data)
    },
    pump: async (req, res) => {
>>>>>>> 3fa85a0e50cfae3cf0d10868d502632b92b4f03d:backend/src/service/control.service.js
        data = JSON.stringify(parseInt(req.query.data))
        client.publish(bbc_pump, data)
    }
}

module.exports = control;