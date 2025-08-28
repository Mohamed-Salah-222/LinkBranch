import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { type ExpressHandler } from "../types.js";
//*----------------------------------------------------------------------------------------Register----------------------------------------------------------------------------------------
export const registerUser: ExpressHandler = async (req, res, next) => {
  try {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
      res.status(400).json({ message: "All the fields are required" });
      return;
    }
    if (password.length < 8) {
      res.status(400).json({ message: "Password must be at least 8 characters" });
      return;
    }
    let userName = await User.findOne({ username });
    if (userName) {
      res.status(400).json({ message: "This username is already taken" });
      return;
    }
    let user = await User.findOne({ email });
    if (user) {
      res.status(400).json({ message: "Email already exists please use another one" });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      username,
      displayName: username,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET as string, { expiresIn: "1d" });
    res.status(201).json({
      message: "Registration successful",
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    next(error);
  }
};
//*----------------------------------------------------------------------------------------Login----------------------------------------------------------------------------------------
export const loginUser: ExpressHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: "Please provide email and password" });
      return;
    }
    const user = await User.findOne({ email }).select("+password");

    if (!user || !user.password) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }
    const payload = { id: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: "1d" });

    res.status(200).json({
      message: "Logged in successfully!",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};
//*----------------------------------------------------------------------------------------Get Current User----------------------------------------------------------------------------------------
export const getMe: ExpressHandler = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const user = await User.findById(userId).select("-password");

    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }
    res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      displayName: user.displayName,
      bio: user.bio,
    });
  } catch (error) {
    next(error);
  }
};
