import express from 'express';
import ItemModel from "../models/items";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();


const itemRouter = express.Router();
import { Request } from "express";
interface AuthRequest extends Request {
    user?: { userId: string };
}

//get all item by creator
itemRouter.get("/", async (req: AuthRequest, res) => {
    try {
        const token = req.cookies["token"];
        if (!token) {
            res.status(401).json({ message: 'Access denied. No token provided.' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
        req.user = decoded;
        const id = req.user.userId;
        const items = await ItemModel.find({ creator: id }).exec();
        res.send(items);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ msg: 'Server error', error });
    }
});

//register an item
itemRouter.post("/register", async (req: AuthRequest, res) => {
    try {
        const token = req.cookies["token"];
        if (!token) {
            res.status(401).json({ message: 'Access denied. No token provided.' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
        req.user = decoded;
        const _id = req.user.userId;
        const newItem = new ItemModel({
            ...req.body,
            creator: _id
        });
        await newItem.save();
        res.send(newItem);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ msg: 'Server error', error });
    }
});

//delete an item
itemRouter.delete("/delete/:_id", async (req: AuthRequest, res) => {
    try {
        const token = req.cookies["token"]; // Replace with actual cookie name
        if (!token) {
            res.status(401).json({ message: 'Access denied. No token provided.' });
        }
        else {
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
            req.user = decoded;
            const _id = req.params._id;
            const item = await ItemModel.findById(_id);
            if (item?.creator.toString() !== req.user.userId) {
                res.status(403).json({ message: 'Not authorized to delete this item' });
            }
            await item!.deleteOne();
            res.send(item);
        }
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ msg: 'Server error', error });
    }
});

itemRouter.delete("/delete-image", async (req, res) => {
    const cloudinary = require("cloudinary").v2;
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_APIKEY,
        api_secret: process.env.CLOUDINARY_APISECRET,
    });


    try {
        const { public_ids } = req.body; // Expect an array of public IDs

        if (!public_ids || !Array.isArray(public_ids) || public_ids.length === 0) {
            res.status(400).json({ error: "Invalid public_ids array" });
        }

        // Delete multiple images
        const results = await Promise.all(
            public_ids.map((publicId) => cloudinary.api.delete_resources(publicId))
        );

        res.json({ success: true, results });
    } catch (error) {
        res.status(500).json({ error: "Error deleting images", details: error });
    }
});

export default itemRouter;