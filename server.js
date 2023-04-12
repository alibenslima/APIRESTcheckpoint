const express = require("express");
const connect = require("./config/connectDB");
const app = express();

const User = require("./models/User");
require("dotenv").config({ path: "./config/.env" });
app.use(express.json());
connect();
//----------------ADD REQUEST------------------
app.post("/add", async (req, res) => {
  const { fullName, email, phone } = req.body;
  try {
    const newUser = new User({
      fullName,
      email,
      phone,
    });
    await newUser.save();
    res.send(newUser);
  } catch (error) {
    console.log(error);
  }
});
//----------------GET REQUEST------------------

app.get("/get", async (req, res) => {
  const users = await User.find();
  try {
    res.send(users);
  } catch (error) {
    console.log(error);
  }
});
//----------------GET  by id REQUEST------------------

app.get("/get/:id", async (req, res) => {
  try {
    const usersp = await User.findById(req.params.id);
    res.send(usersp);
  } catch (error) {
    console.log(error);
  }
});

//----------------Update REQUEST------------------
app.put("/update/:id", async (req, res) => {
  const updateuser = await User.findByIdAndUpdate(
    req.params.id,
    { ...req.body },
    { new: true }
  );
  try {
    res.send(updateuser);
  } catch (error) {
    console.log(erreur(error));
  }
});

//----------------DELETE REQUEST------------------
app.delete("/delete/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.send("User deleted");
  } catch (error) {
    console.log(error);
  }
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) => {
  err
    ? console.log("Error in server setup")
    : console.log("Server listening on Port", PORT);
});
