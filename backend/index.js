import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import swaggerUiDist from 'swagger-ui-dist';
import cors from 'cors';
import database from './src/config/index.js';
import route from './src/controller/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;
const pathToSwaggerUi = swaggerUiDist.absolutePath();

database.connect();

app.use('', express.static(pathToSwaggerUi));

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH"],
}));

app.get('/swagger.json', (req, res) => {
    res.sendFile(path.join(__dirname, 'swagger.json'));
});

app.get('/docs', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Swagger UI</title>
            <link rel="stylesheet" type="text/css" href="./swagger-ui.css" >
            <script src="./swagger-ui-bundle.js"></script>
            <script src="./swagger-ui-standalone-preset.js"></script>
        </head>
        <body>
            <div id="swagger-ui"></div>
            <script>
                SwaggerUIBundle({
                    url: "/swagger.json",
                    dom_id: '#swagger-ui',
                    presets: [
                        SwaggerUIBundle.presets.apis,
                        SwaggerUIStandalonePreset
                    ],
                    layout: "BaseLayout"
                });
            </script>
        </body>
        </html>
    `);
});

route(app);

app.listen(port, () => {
    console.log(`App now run on: http://localhost:${port}`);
    console.log(`Run api on: http://localhost:${port}/docs`);
});