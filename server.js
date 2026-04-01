import express from "express";
import mongoose from "mongoose";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello, World! , server runing on port 3000");
});

app.get("/about" , (req ,res) => {
  res.send("This is the about page");
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});