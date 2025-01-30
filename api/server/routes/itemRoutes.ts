import express from 'express';
import ItemModel from "../models/items";
import jwt from "jsonwebtoken";

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

export default itemRouter;