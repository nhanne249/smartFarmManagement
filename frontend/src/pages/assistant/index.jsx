import React, { useState,useEffect } from "react";
import { UserOutlined } from '@ant-design/icons';
import {Bubble,Sender} from '@ant-design/x';
import Markdown from 'react-markdown'
import { assistant } from "../../api/api";

const AssistantPage = () => {
    const [messages, setMessages] = useState([
        {
            sender: "Assistant",
            message: `Hello! I'm your farm assistant. How can I help you today?

I can assist you with a variety of tasks to help manage your farm efficiently, including:

- **Updating the current weather** so you can plan your farming activities accordingly.  
- **Checking the current status values** of your farm environment and devices.  
- **Adjusting the fan settings** to regulate air circulation.  
- **Changing the pump settings** to control irrigation.  
- **Modifying both the fan and pump values simultaneously** for optimal environmental control.
            `,
        }
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const container = document.getElementById("messages-container");
        if (container) {
            container.scrollTop = container.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = async () => {
        const newMessage = { id: Date.now(), sender: "User", message: input };
        setMessages((prev) => [...prev, newMessage]);
        setInput("");
        try {
            setLoading(true);
            const response = await assistant(input,messages);
            if (response.data) {
                const assistantMessage = {
                    id: Date.now() + 1,
                    sender: "Assistant",
                    message: response.data,
                };
                setMessages((prev) => [...prev, assistantMessage]);
            }
            setInput("");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="flex flex-col h-full">
            <p className='text-4xl text-cyan-950 font-bold'>Farm Manager Assistant</p>
            <div
                className="flex-grow overflow-y-auto h-[calc(100vh-340px)] p-4 flex flex-col gap-5"
                id="messages-container"
            >
                {messages.map((message, index) => (
                    <Bubble
                        key={index}
                        classNames={{
                            content: "h-fit flex flex-col items-start px-3 font-normal shadow-md bg-gray-50",
                        }}
                        placement={message.sender === "User" ? "end" : "start"}
                        messageRender={() => <Markdown>{message.message}</Markdown>}
                        variant="shadow"
                        avatar={{ icon: <UserOutlined />, style: message.sender === "User" ? ({ backgroundColor: "green" }) : ({ backgroundColor: "red" }) }}
                        shape="round"
                    />
                ))}
            </div>

            <div className="bg-white h-20 p-4 flex items-center">
                <Sender
                    placeholder="Type your message..."
                    value={input}
                    onChange={(value, event) =>
                        event.code === "Enter" ? handleSendMessage() : setInput(value)
                    }
                    onSubmit={handleSendMessage}
                    disabled={loading}
                    loading={loading}
                    classNames={{
                        input: "h-fit px-3 content-center",
                    }}
                />
            </div>
        </div>
    );
};

export default AssistantPage;