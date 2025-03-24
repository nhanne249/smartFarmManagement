const DayReport = require("../model/day");
const { send_Port } = require("../mqtt/index");

const api = {
    api_analysit: async (req, res) => {
        items = req.query.items;
        page = req.query.page
        skip = (page - 1) * items
        from = req.query.from
        to = req.query.to
        if (from && to) {
            from = new Date(from)
            to = new Date(to)
            const daysReport = await DayReport.find({
                day: { $gte: from, $lte: to }
            })
                .skip(skip)
                .limit(items)
                .lean()
            total = await DayReport.countDocuments({
                day: { $gte: from, $lte: to }
            })
            jsonString = [daysReport, total]
            res.json(jsonString)
        } else {
            const daysReport = await DayReport.find()
                .skip(skip)
                .limit(items)
                .lean()
            total = await DayReport.countDocuments()
            jsonString = [daysReport, total]
            res.json(jsonString)
        }
    },
    api_call_iot: async (req, res) => {
        send_Port.publish("iot/nodejs-python", JSON.stringify("test"))
    }
}

module.exports = api;