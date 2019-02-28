const express = require("express");

const app = express.Router();
const userExerciseModel = require("../models/user-exercise");

// Mapping routes to functions
app.get("/", (req, res) => {
  userExerciseModel.getAll((err, data) => {
    if(err) throw err;
    res.send(data);
  })
});

app.post("/", (req, res) => {
  userExerciseModel.add({}, (err, data) => {
    if(err) throw err;
    //
  })
})


// Equivalent to return for require
module.exports = app;

