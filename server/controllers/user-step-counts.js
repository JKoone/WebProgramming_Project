const express = require("express");

const app = express.Router();
const userStepCountModel = require("../models/user-step-count");

// Mapping routes to functions
app.get("/", (req, res) => {
  userStepCountModel.getAll((err, data) => {
    if(err) throw err;
    res.send(data);
  })
});

app.post("/", (req, res) => {
  userStepCountModel.add({}, (err, data) => {
    if(err) throw err;
    //
  })
})


// Equivalent to return for require
module.exports = app;


