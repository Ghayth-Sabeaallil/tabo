import express from 'express';
import ItemModel from "../models/items";

const itemRouter = express.Router();

itemRouter.get("/:username", async (req, res) => {
    try {
        const username = req.params.username;
        const items = await ItemModel.find({ creator: username }).exec();
        res.send(items);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ msg: 'Server error', error });
    }
});


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

// Register Route
itemRouter.delete("/delete/:_id", async (req, res) => {
    try {
        const _id = req.params._id;
        const items = await ItemModel.findByIdAndDelete({ _id: _id }).exec();
        res.send(items);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ msg: 'Server error', error });
    }
});

export default itemRouter;