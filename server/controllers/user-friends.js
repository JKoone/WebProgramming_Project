const express = require("express");

const app = express.Router();
const userFriendModel = require("../models/user-friend");

// Mapping routes to functions
app.get("/", (req, res) => {
  userFriendModel.getAll((err, data) => {
    if(err) throw err;
    res.send(data);
  })
});

app.post("/", (req, res) => {
  userFriendModel.add({}, (err, data) => {
    if(err) throw err;
    //
  })
})


// Equivalent to return for require
module.exports = app;

