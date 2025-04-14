const send = require("./equipment.controller");
const api = require("./api.controller");

module.exports = (app) => {
    app.use("/api", api)
    app.use("/api/control", send)
}