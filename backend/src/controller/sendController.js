const DayReport = require("../model/day");
const { send_Port } = require("../mqtt/index")

const send = {
    api_send: async (req, res) => {
        let message = JSON.stringify({ temperature: Math.random() * 50 });
        console.log(`Gửi tin nhắn: ${message.toString()}`);
        send_Port.publish('iot/nodejs-python', message);
        res.redirect("/")
    }
}

module.exports = send;