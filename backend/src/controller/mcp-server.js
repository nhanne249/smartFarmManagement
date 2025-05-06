import express from "express";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
//mcp service import
import { getEquipmentLatestStatus, getWeatherInfo } from "../service/mcp.service.js";
import control from "../service/control.service.js";

const MCPServerController = express.Router();
MCPServerController.use(express.json());

const MCPServer = new McpServer(
    {
        name: "Smart Farm MCP Server",
        version: "1.0.0",
    },
    {
        capabilities: {
            logging: {},
        },
    }
);
////////////////////////////////////////////////////////////////////////////////////////////////////
MCPServer.tool(
    "get-latest-wheateher-info",
    "Get lastest weather info in realtime",
    {},
    async (args, extra) => {
        await extra.sendNotification({
            method: "notifications/message",
            params: {
                level: "info",
                data: "Server started logging for notifications/message"
            }
        });
        return await getWeatherInfo()
    },
)

MCPServer.tool(
    "get-latest-equipment-status",
    "Get lastest equipment status",
    {},
    async (args, extra) => {
        await extra.sendNotification({
            method: "notifications/message",
            params: {
                level: "info",
                data: "Server started logging for notifications/message"
            }
        });
        return await getEquipmentLatestStatus()
    },
)

MCPServer.tool(
    "change-fan-value",
    "Change fan value",
    {
        type: "object",
        properties: {
            value: { type: "number" },
        },
        required: ["value"],
    },
    async (args, extra) => {
        const { value } = args;
        await extra.sendNotification({
            method: "notifications/message",
            params: {
                level: "info",
                data: `Fan value changed to ${value}`
            }
        });
        return await control.fan(value)
    },

)

MCPServer.tool(
    "change-pump-value",
    "Change pump value",
    {
        type: "object",
        properties: {
            value: { type: "number" },
        },
        required: ["value"],
    },
    async (args, extra) => {
        const { value } = args;
        await extra.sendNotification({
            method: "notifications/message",
            params: {
                level: "info",
                data: `Pump value changed to ${value}`
            }
        });
        return await control.pump(value)
    },
)
////////////////////////////////////////////////////////////////////////////////////////////////
const transports = {}

MCPServerController.get("", async (req, res) => {
    console.log("MCP server started")
    const transport = new SSEServerTransport('/api/mcp-server', res);
    transports[transport.sessionId] = transport
    await MCPServer.connect(transport);
})

MCPServerController.post("", async (req, res) => {
    const sessionId = req.query.sessionId

    const transport = transports[sessionId]
    if (!transport) {
        res.status(400).send({ messages: "No transport found for sessionId." })
        return
    }
    await transport.handlePostMessage(req, res, req.body)
    return
});

export default MCPServerController;