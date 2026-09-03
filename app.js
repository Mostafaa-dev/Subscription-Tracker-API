import express from "express";

import { PORT } from "./config/env.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import subscriptionRoutes from "./routes/subscription.routes.js";
import connectToDatabase from "./database/mongodb.js";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subscriptionRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Subscription Tracker API!");
});

// Start server
const startServer = async () => {
  try {
    await connectToDatabase();

    app.listen(PORT, () => {
      console.log(
        `Subscription Tracker API is running on http://localhost:${PORT}`,
      );
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();

export default app;
