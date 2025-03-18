const home = require("./home_route");
const send = require("./send_route");
const api = require("./api_route");

module.exports = (app) => {
    app.use("/api", api)
    app.use("/send", send)
    app.use("/", home);
}