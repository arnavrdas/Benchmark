import express        from "express";
import corsConfig     from "./config/cors.config.js";
import env            from "./config/env.config.js";
import authRouter     from "./modules/auth/auth.router.js";
import errorHandler   from "./shared/middlewares/errorHandler.middleware.js"

const app = express();

// Global Middlewares
app.use(corsConfig);
app.use(express.json());

// Application Routes
app.use("/auth",    authRouter);

// Error Handler
app.use(errorHandler);

// Start Server
app.listen(env.PORT, () => { console.log(`App is listening on port ${env.PORT}`) });