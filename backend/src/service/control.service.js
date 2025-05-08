import client from "../mqtt/index.js";

const bbc_fan = process.env.BBC_FAN;
const bbc_pump = process.env.BBC_PUMP;

const control = {
    fan: async (req, res) => {
        let data = JSON.stringify(parseInt(req.query.data));
        client.publish(bbc_fan, data);
        res.status(200).json({ message: "Fan status updated successfully", status: data });
    },
    pump: async (req, res) => {
        let data = JSON.stringify(parseInt(req.query.data));
        client.publish(bbc_pump, data);
        res.status(200).json({ message: "Pump status updated successfully", status: data });
    }
}

export default control;