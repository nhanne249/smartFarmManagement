const mqtt = require('mqtt');
const DayReport = require("../model/day");
const day = require('../model/day');
const send_Port = mqtt.connect('mqtt://localhost');
const listen_Port = mqtt.connect('mqtt://localhost');
// Khi gửi được tin nhắn tới IoT

function listen() {
    listen_Port.on('connect', () => {
        console.log('Đã kết nối MQTT');
        listen_Port.subscribe('iot/python-nodejs');
    });

    data_on_hour = []
    listen_Port.on('message', async (topic, message) => {
        data = JSON.parse(message).temperature
        data_on_hour.push(data)
        if (data_on_hour.length == 5) {
            avg = data_on_hour.reduce((acc, cur) => acc + cur, 0) / 5
            data_on_hour = []
            let now = new Date()
            now = now.toISOString().split("T")[0]
            let dayReport = await DayReport.find({ day: now }).lean();
            if (dayReport.length != 0) {
                avg = { temperature: avg, humidity: avg }
                dayReport[0].data.push(avg)
                await DayReport.findByIdAndUpdate(dayReport[0]._id, { data: dayReport[0].data }, { new: true });
            } else {
                dayReport = await DayReport.create({
                    day: now,
                    data: [{ temperature: avg, humidity: avg }]
                })
            }
        }
    });
}

send_Port.on('connect', () => {
    console.log('Đã kết nối MQTT');
});

module.exports = { send_Port, listen }