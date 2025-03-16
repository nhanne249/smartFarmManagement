const DayReport = require("../model/day");
const mttq = require("../mqtt/index")

const home = {
    api_home: async (req, res) => {
        res.send('Hello World!')
    }
}

module.exports = home;