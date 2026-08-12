import express        from "express";

// Configs
import corsConfig     from "./config/cors.config.js";
import env            from "./config/env.config.js";

// Routes
import authRouter     from "./modules/auth/auth.router.js";

const app = express();

// Global Middlewares
app.use(corsConfig);
app.use(express.json());

// Application Routes
app.use("/auth",    authRouter);

// Start Server
app.listen(env.PORT, () => { console.log(`App is listening on port ${env.PORT}`) });