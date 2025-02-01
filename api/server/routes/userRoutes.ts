import express from "express";
import UserModel from "../models/users";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userRouter = express.Router();

userRouter.get("/", async ({ res }: any) => {
    try {
        const users = await UserModel.find().exec();
        res.send(users);
    } catch (error) {
        res.status(500).json({ msg: 'Server error', error });
    }
});

// Register Route
userRouter.post("/register", async (req, res) => {
    try {
        const newUser = new UserModel(req.body);
        const existingUser = await UserModel.findOne({ username: newUser.username });
        if (!existingUser) {
            const hashedPassword = await bcrypt.hash(newUser.password, 10);
            const newUserRegister = new UserModel({ username: newUser.username, password: hashedPassword });
            await newUserRegister.save();
            res.status(201).json({ msg: 'User created successfully' });
        }
        else {
            res.status(400).json({ msg: 'User already exists' });
        }
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ msg: 'Server error', error });
    }
});


userRouter.get('/profile', async (req, res) => {
    try {
        const token = req.cookies.token;
        if (token !== undefined) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await UserModel.findById(decoded.userId);
            res.json({ username: user!.username });
        } else {
            res.status(401).json({ msg: 'Token is missing or undefined' });
        }
    } catch (error) {
        res.status(500).json({ msg: 'Server error', error });
    }
});

userRouter.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await UserModel.findOne({ username });
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                res.cookie('token', token, { httpOnly: true, secure: true, sameSite: "none" });
                res.cookie('username', username, { secure: true, sameSite: "none" });
                res.status(200).json({ msg: 'Login successful', token, username: user.username });
            }
            else {
                res.status(401).json({ msg: 'Wrong password or username' });
            }
        }
        else {
            res.status(401).json({ msg: 'Wrong password or username' });
        }
    } catch (error) {
        res.status(500).json({ msg: 'Server error', error });
    }
});

userRouter.post('/logout', ({ res }: any) => {
    res.clearCookie('token');
    res.clearCookie('username');
    res.json({ msg: 'Logged out' });
});

export default userRouter;