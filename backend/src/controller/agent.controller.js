import { GoogleGenAI, Type } from '@google/genai';
import express from 'express';
import axios from 'axios';
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { SSEClientTransport } from "@modelcontextprotocol/sdk/client/sse.js";
import { z } from "zod";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

const AgentController = express.Router();

// Parse JSON body for all requests handled by this router
AgentController.use(express.json());

function cleanSchema(obj) {
    if (Array.isArray(obj)) {
        return obj.map(cleanSchema);
    } else if (obj && typeof obj === 'object') {
        const { $schema, additionalProperties, ...rest } = obj;
        const cleaned = {};
        for (const key in rest) {
            cleaned[key] = cleanSchema(rest[key]);
        }
        return cleaned;
    }
    return obj;
}

AgentController.post("", async (req, res) => {
    const body = req.body;
    const message = body.message;
    if (message && message.text) {
        try {
            const transport = new SSEClientTransport(new URL('http://localhost:3000/api/mcp-server'));
            const client = new Client({ name: 'test', version: "1.0.0" });
            await client.connect(transport);
            const tools = await client.listTools();
            //Gọi AI lần đầu để lấy data phù hợp
            const response = await ai.models.generateContent({
                model: 'gemini-2.0-flash',
                contents: {
                    role: "user",
                    parts: [{
                        text: `
                    You are a Smart Farm Manager AI assistant. Your task is to analyze the input of the user and directly choose the most suitable tool to perform the task if the input matches the description of any tool. If no tool is suitable, respond normally in Vietnamese. Do not ask for further clarification if a tool can be used; proceed with the tool immediately.
                    The input is: ${message.text}
                `,
                    }]
                },
                config: {
                    tools: tools.tools.map((tool) => ({
                        functionDeclarations: [{
                            name: `${tool.name}`,
                            description: `${tool.description}`,
                            parameters: cleanSchema(tool.inputSchema),
                        }]
                    })),
                },
            });
            let responseResult;
            const dataResponse = response.candidates[0].content.parts[0]
            if (dataResponse.functionCall) {
                const result = await client.callTool({
                    name: dataResponse.functionCall.name,
                    arguments: dataResponse.functionCall.args,
                });
                // Gọi AI lần 2 để response data phù hợp
                const finalResponse = await ai.models.generateContent({
                    model: 'gemini-2.0-flash',
                    contents: {
                        role: "user",
                        parts: [{
                            text: `
                        You are a Smart Farm Manager AI assistant. Your task is to analyze the input of the user then you will use suitable data to response as easy to understand as possible, the answer you response must have full of detail if the keyword data has value and the answer is need for farm.
                        Note: Your answer must use Vietnamese language, easy to understand and give some advice if data return can affect the farm.
                        The input is: ${message.text}
                        The data is :  ${result.content[0].text}
                        `,
                        }]
                    },
                });
                responseResult = finalResponse.candidates[0].content.parts[0].text;
            }
            else responseResult = dataResponse.text;
            await client.close();
            res.status(200).json({ error: null, data: responseResult });
        }
        catch (error) {
            res.status(400).json({ error: error, data: null });;
        }
    }
})

export default AgentController;