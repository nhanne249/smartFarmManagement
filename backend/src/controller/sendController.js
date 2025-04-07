require('dotenv').config()
const DayReport = require("../model/day")
const client = require("../mqtt/index")

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
        data = JSON.stringify(parseInt(req.query.data))
        client.publish(bbc_pump, data)
    }
}

module.exports = send;