const equipment = require("./equipment.controller");
const data = require("./data.controller");
// const 

module.exports = (app) => {
    app.use("/api", data)
    app.use("/api/control", equipment)
}