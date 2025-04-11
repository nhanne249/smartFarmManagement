const send = require("./send.controller");
const api = require("./api.controller");

module.exports = (app) => {
    app.use("/api", api)
    app.use("/api/send", send)
}