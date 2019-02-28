const express = require("express");

const app = express.Router();
const exerciseModel = require("../models/exercise");

// Mapping routes to functions
app.get("/", (req, res) => {
  exerciseModel.getAll((err, data) => {
    if(err) throw err;
    res.send(data);
  })
});

app.post("/", (req, res) => {
  exerciseModel.add({}, (err, data) => {
    if(err) throw err;
    //
  })
})


// Equivalent to return for require
module.exports = app;


