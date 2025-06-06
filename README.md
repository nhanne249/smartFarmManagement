# smartFarmManagement

## Description
SmartFarmManagement is a comprehensive solution for managing and monitoring smart farming equipment. It includes a backend API server and a frontend client for seamless interaction with farming devices and data visualization.

## Features

### Backend Features
- **API Endpoints:**
  - `/analyst`: Analyze farming data with pagination and optional date filtering.
  - `/control/fan`: Control fan equipment (0-100 values).
  - `/control/pump`: Control pump equipment (0-100 values).
  - `/equipment-status`: Monitor the status of farming equipment from Adafruit IO.
  - `/mcp-server`: MCP server with Server-Sent Events for AI Assistant communication.
  - `/agent`: AI Smart Farm Agent with weather info, equipment control via MCP tools.
- **Real-time Features:**
  - MQTT integration with Adafruit IO for live sensor data streaming
  - Server-Sent Events for AI Assistant communication
- **Technologies:** Express.js, Mongoose, dotenv, axios, @modelcontextprotocol/sdk, Google Generative AI.

### Frontend Features
- **Pages:**
  - Dashboard: Visualize real-time farming data (temperature, humidity) and equipment status via MQTT.
  - Settings: Control fan and pump equipment with slider inputs (0-100 values).
  - Data: View historical sensor data with pagination support.
  - Assistant: Interact with AI assistant for weather info, equipment control, and farming insights.
- **Real-time Features:**
  - MQTT client for live data updates
  - Server-Sent Events for AI Assistant responses
- **Technologies:** React, Ant Design (AntD), TailwindCSS, Vite, React Router.

## Getting Started

### Prerequisites
Before you begin, make sure you have the following installed:
- Node.js (>= 14.x)
- npm (Node Package Manager)
- MongoDB database
- Adafruit IO account (for MQTT and device feeds)
- Google AI API key (for AI Assistant)

### How to Run This Project

#### 1. Running the Backend (API server)
1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install the necessary dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root of the `backend` directory and configure your environment variables:
   ```env
   MONGO_URI=<your_mongodb_connection_string>
   JWT_SECRET=<your_jwt_secret>
   ADAFRUIT_IO_KEY=<your_adafruit_io_key>
   ADAFRUIT_IO_USERNAME=<your_adafruit_io_username>
   GOOGLE_API_KEY=<your_google_ai_api_key>
   PORT=3000
   ```
4. Run the backend server in development mode:
   ```bash
   npm run dev
   ```
   The backend should now be running at `http://localhost:3000`.

#### 2. Running the Frontend (Client)
1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install the necessary dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root of the `frontend` directory and configure your environment variables:
   ```env
   VITE_BACKEND_API=http://localhost:3000
   VITE_ADAFRUIT_IO_KEY=<your_adafruit_io_key>
   VITE_ADAFRUIT_IO_USERNAME=<your_adafruit_io_username>
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```
   The frontend should now be running at `http://localhost:5173` (or another port depending on your setup).

### Usage
Once both the frontend and backend are running, you can:
- **Dashboard**: Monitor real-time temperature and humidity data from MQTT sensors.
- **Settings**: Control fan and pump equipment with precise 0-100 value controls.
- **Data**: Browse historical sensor data with pagination and date-based organization.
- **Assistant**: Chat with AI assistant for weather information, equipment status checks, and intelligent farming recommendations.

## Technologies Used

### Backend
- ![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)
- ![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=flat&logo=mongoose&logoColor=white)
- ![dotenv](https://img.shields.io/badge/dotenv-000000?style=flat&logo=dotenv&logoColor=white)
- ![axios](https://img.shields.io/badge/axios-5A29E4?style=flat&logo=axios&logoColor=white)
- ![Model Context Protocol SDK](https://img.shields.io/badge/MCP_SDK-000000?style=flat&logo=protocol&logoColor=white)
- ![Google AI](https://img.shields.io/badge/Google_AI-4285F4?style=flat&logo=google&logoColor=white)
- ![MQTT](https://img.shields.io/badge/MQTT-660066?style=flat&logo=mqtt&logoColor=white)

### Frontend
- ![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
- ![Ant Design](https://img.shields.io/badge/Ant_Design-0170FE?style=flat&logo=ant-design&logoColor=white)
- ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
- ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
- ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=flat&logo=react-router&logoColor=white)

### Other
- ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
- ![npm](https://img.shields.io/badge/npm-CB3837?style=flat&logo=npm&logoColor=white)
- ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)
- ![Adafruit IO](https://img.shields.io/badge/Adafruit_IO-000000?style=flat&logo=adafruit&logoColor=white)

## API Documentation
API documentation is available via Swagger at: `http://localhost:3000/api-docs` when the backend server is running.