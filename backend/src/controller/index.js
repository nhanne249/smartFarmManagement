import equipment from "./equipment.controller.js";
import data from "./data.controller.js";
import MCPServerController from "./mcp-server.js";
import AgentController from "./agent.controller.js";

export default (app) => {
    app.use("/api", data)
    app.use("/api/control", equipment)
    app.use("/api/mcp-server", MCPServerController)
    app.use("/api/agent", AgentController)
}