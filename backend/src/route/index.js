const home = require("./home_route");
const send = require("./send_route");
const api = require("./api_route");
const predict = require("./predict_route");
const getSTT = require("./getSTT_route");

module.exports = (app) => {
    app.use("/api", api)
    app.use("/send", send)
    app.use("/predict", predict)
    app.use("/getSTT", getSTT)
    app.use("/", home);
}