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
        origin: "https://www.tabo963.com", // Your custom domain (no trailing slash)
        methods: "GET,POST,PUT,DELETE,OPTIONS",
        credentials: true, // If using cookies or authentication
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);


app.use("/api", apiRouter);

console.log("Starting server...");

app.listen(process.env.PORT, () => {
    console.log("Server is listening on " + process.env.PORT);
});