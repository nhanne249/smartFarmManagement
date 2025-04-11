require('dotenv').config()
const DayReport = require("../model/day")
const client = require("../mqtt/index")

const bbc_pump = process.env.BBC_FAN

const control = {
    fan: async (req, res) => {
        data = JSON.stringify(parseInt(req.query.data))
        client.publish(bbc_fan, data)
    },
    pump: async (req, res) => {
        data = JSON.stringify(parseInt(req.query.data))
        client.publish(bbc_pump, data)
    }
}

module.exports = control;