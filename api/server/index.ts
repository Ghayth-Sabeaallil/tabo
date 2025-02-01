import Mongoose from "mongoose";
import Express from "express";
import dotenv from 'dotenv';
import { apiRouter } from "./api";
import cors from "cors"
dotenv.config();
const app = Express();


console.log("Attempting to connect to mongodb..");

Mongoose.connect(process.env.MONGO_URI!)
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((err) => console.error("MongoDB connection error:", err));
app.use(
    cors({
        origin: "https://www.tabo963.com", // Match your custom domain exactly (no trailing slash)
        methods: "GET,POST,PUT,DELETE,OPTIONS",
        credentials: true, // If using cookies/authentication
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

// Explicitly handle preflight OPTIONS requests if needed
app.options("*", (req, res) => {
    res.header("Access-Control-Allow-Origin", "https://www.tabo963.com");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.sendStatus(200); // Respond to OPTIONS with status 200
});


app.use("/api", apiRouter);

console.log("Starting server...");

app.listen(process.env.PORT, () => {
    console.log("Server is listening on " + process.env.PORT);
});