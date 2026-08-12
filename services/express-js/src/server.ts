import express        from "express";

// Configs
import corsConfig     from "./config/cors.config.js";
import env            from "./config/env.config.js";

const app = express();

// Global Middlewares
app.use(corsConfig);
app.use(express.json());

// Start Server
app.listen(env.PORT, () => { console.log(`App is listening on port ${env.PORT}`) });