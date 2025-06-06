import DayReport from "../model/day.js";
import axios from 'axios';

const data = {
    analysit: async (req, res) => {
        try {
            const items = parseInt(req.query.items) || 10;
            const page = parseInt(req.query.page) || 1;
            const skip = (page - 1) * items;
            let from = req.query.from;
            let to = req.query.to;

            let query = {};
            if (from && to) {
                from = new Date(from);
                to = new Date(to);
                query.day = { $gte: from, $lte: to };
            }

            const daysReport = await DayReport.find(query)
                .skip(skip)
                .limit(items)
                .lean();

            const totalItems = await DayReport.countDocuments(query);
            const totalPages = Math.ceil(totalItems / items);

            const response = {
                totalPages: totalPages,
                totalItems: totalItems,
                data: daysReport,
            };

            res.json(response);
        } catch (error) {
            console.error("Error in api_analysit:", error);
            res.status(500).json({ error: error });
        }
    },
    getStatus: async (req, res) => {
        try {
            let feed = process.env.BBC_FAN;
            if (req.query.value == "pump") feed = process.env.BBC_PUMP;
            let url = `https://io.adafruit.com/api/v2/${feed}/data/last`;
            let result = await axios.get(url, {
                headers: {
                    'X-AIO-Key': process.env.ADAFRUIT_IO_KEY
                }
            });
            let val = result.data.value;
            res.status(200).json({ value: val });
        } catch (e) {
            // console.log(e.response);
            res.status(500).json({ message: "Lỗi khi lấy được dữ liệu!!!" });
        }
    },
};

export default data;