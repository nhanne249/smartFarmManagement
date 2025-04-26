import equipment from "./equipment.controller.js";
import data from "./data.controller.js";

export default (app) => {
    app.use("/api", data)
    app.use("/api/control", equipment)
}