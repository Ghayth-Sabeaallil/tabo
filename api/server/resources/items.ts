import Express from "express";
import Mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { error } from "console";

interface Item {
    description: string,
    address: string,
    price: number,
    rooms: number,
    phone: number,
    location: Location,
    city: string,
    area: number,
    type: string,
    date_created: string,
    is_active: boolean,
    creator: string

}

interface Location {
    lat: number;
    lng: number;
}

const schema = new Mongoose.Schema<Item>({
    description: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    type: { type: String, required: true },
    price: { type: Number, required: true },
    phone: { type: Number, required: true },
    rooms: { type: Number, required: true },
    area: { type: Number, required: true },
    location: { type: Object, required: true },
    date_created: { type: String, required: true },
    is_active: { type: Boolean, required: true },
    creator: { type: String, required: true },

});

const ItemModel = Mongoose.model("item", schema);

export const itemRouter = Express.Router();


// Register Route
itemRouter.post("/register", async (req, res) => {
    try {
        const newEvent = new ItemModel(req.body);
        await newEvent.save();
        res.send(newEvent);

    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ msg: 'Server error', error });
    }
});

