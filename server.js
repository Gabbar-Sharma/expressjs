import express from "express";
import mongoose from "mongoose";
import User from "./models/User.js";



const app = express();
app.use(express.json());

// MongoDB connect
mongoose.connect("mongodb://127.0.0.1:27017/travelApp")
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log(err));

// Test route
app.get("/", (req, res) => {
  res.send("API chal rahi hai 🚀");
});


app.post("/register", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json({ message: "User saved ✅", user });
  } catch (err) {
    res.status(500).json(err);
  }
});


app.post("/register", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json({ message: "User saved ✅", user });
  } catch (err) {
    res.status(500).json(err);
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});