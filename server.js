import express from "express";
import mongoose from "mongoose";
import User from "./models/User.js";

import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());

// MongoDB connect
mongoose.connect("mongodb://127.0.0.1:27017/travelApp")
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log(err));

// Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

const User = mongoose.model("User", userSchema);

// REGISTER

// LOGIN
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.json({ message: "User not found ❌" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.json({ message: "Wrong password ❌" });
  }

  const token = jwt.sign({ userId: user._id }, "secret123");

  res.json({ message: "Login success ✅", token });
});

// PROTECTED ROUTE
const auth = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.json({ message: "No token ❌" });
  }

  try {
    const decoded = jwt.verify(token, "secret123");
    req.user = decoded;
    next();
  } catch {
    res.json({ message: "Invalid token ❌" });
  }
};

app.get("/profile", auth, (req, res) => {
  res.json({ message: "Protected data 🔐", user: req.user });
});

app.listen(3000, () => {
  console.log("Server running 🚀");
});