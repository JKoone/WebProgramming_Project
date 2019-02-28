const express = require("express");

const app = express.Router();
const userModel = require("../models/user");

// Mapping routes to functions
app.get("/", (req, res) => {
  userModel.getAll((err, data) => {
    if(err) throw err;
    res.send(data);
  })
  //conn.query("SELECT * FROM InClass_Person", (err, data) => {
  //    if(err) throw err;
  //    res.send(data);
  //})
  //res.send([{FirstName: "Fake Person"}]);
});

app.post("/", (req, res) => {
  userModel.add({}, (err, data) => {
    if(err) throw err;
    //
  })
})


// Equivalent to return for require
module.exports = app;


