const DayReport = require("../model/day");

const api = {
    api_analysit: async (req, res) => {
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
};

module.exports = api;