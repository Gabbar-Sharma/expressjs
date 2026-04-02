const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();


app.get("/", (req, res) => {
  res.send("Hello, World! , server runing on port 3000");
});

app.get("/about" , (req ,res) => {
  res.send("This is the about page");
})

app.get("/contact" , (req ,res) =>{
  res.send("This is the contact page");
})

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});