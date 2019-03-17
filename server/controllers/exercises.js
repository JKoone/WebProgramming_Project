const express = require("express");

const app = express.Router();
const exerciseModel = require("../models/exercise");

// Mapping routes to functions

app.get("/", (req, res) => {
  exerciseModel.getAll((err, data) => {
    if(err){ 
      res.status(400).send({error: err})
      return
    }
    res.send(data)
  })
})
// getExerciseWithName
// Expects query to contain exerciseName
app.get("/getExerciseWithName", (req, res) => {
  exerciseModel.getExerciseWithName(req.query, (err, data) => {
    if(err){ 
      res.status(400).send({error: err})
      return
    }
    res.send(data)
  })
})
// Adds an exercise
// Expects body to contain exerciseName, caloriesPerHour, type
app.post("/", (req, res) => {
  exerciseModel.add(req.body, (err, data) => {
    if(err){ 
      res.status(400).send({error: err})
      return
    }
    res.send(data)
  })
})


// Equivalent to return for require
module.exports = app;


