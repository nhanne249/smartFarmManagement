require('dotenv').config()
const client = require("../mqtt/index")

const bbc_fan = process.env.BBC_FAN
const bbc_pump = process.env.BBC_PUMP

const control = {
    fan: async (req, res) => {
        data = 0
        if (req.query.data == "true") {
            data = 1
        }
        data = JSON.stringify(parseInt(data))
        client.publish(bbc_fan, data)
        res.status(200).json({ message: "Fan status updated successfully", status: data });
    },
    pump: async (req, res) => {
        data = 0
        if (req.query.data == "true") {
            data = 1
        }
        client.publish(bbc_pump, data)
        res.status(200).json({ message: "Pump status updated successfully", status: data });
    }
}

module.exports = control;