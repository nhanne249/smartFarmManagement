import express from "express";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
//mcp service import
import { getEquipmentLatestStatus, getWeatherInfo, changeFanAndPumpValue, changeFanValue, changePumpValue } from "../service/mcp.service.js";
import { z } from "zod";

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
        value: z.number().refine((val) => val >= 0 && val <= 100).describe("Fan value must be between 0 and 100"),
    },
    async ({ value }, extra) => {
        await extra.sendNotification({
            method: "notifications/message",
            params: {
                level: "info",
                data: `Fan value changed to ${value}`
            }
        });
        return await changeFanValue(value)
    },

)

MCPServer.tool(
    "change-pump-value",
    "Change pump value",
    {
        value: z.number().refine((val) => val >= 0 && val <= 100).describe("Pump value must be between 0 and 100"),
    },
    async ({ value }, extra) => {
        await extra.sendNotification({
            method: "notifications/message",
            params: {
                level: "info",
                data: `Pump value changed to ${value}`
            }
        });
        return await changePumpValue(value)
    },
)

MCPServer.tool(
    "change-fan-and-pump-value",
    "Change fan and pump value",
    {
        fanValue: z.number().refine((val) => val >= 0 && val <= 100).describe("Fan value must be between 0 and 100"),
        pumpValue: z.number().refine((val) => val >= 0 && val <= 100).describe("Pump value must be between 0 and 100"),
    },
    async ({ fanValue, pumpValue }, extra) => {
        await extra.sendNotification({
            method: "notifications/message",
            params: {
                level: "info",
                data: `Fan value changed to ${fanValue} and Pump value changed to ${pumpValue}`
            }
        });
        return await changeFanAndPumpValue(fanValue, pumpValue)
    }
)
////////////////////////////////////////////////////////////////////////////////////////////////
const transports = {}

MCPServerController.get("", async (req, res) => {
    console.log("MCP server started")
    const transport = new SSEServerTransport('/api/mcp-server', res);
    transports[transport.sessionId] = transport
    console.log(`SSE connection established for session ${transport.sessionId}`);
    res.on('close', () => {
        delete transports[transport.sessionId];
        console.log(`SSE connection closed for session ${transport.sessionId}`);
    });
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