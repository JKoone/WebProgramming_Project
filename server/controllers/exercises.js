const express = require("express");

const app = express.Router();
const exerciseModel = require("../models/exercise");

// Mapping routes to functions

app.get("/", async (req, res, next) => {
  exerciseModel.getAll()
  .then(x => res.send(x))
  .catch(next)
})
// getExerciseWithName
// Expects query to contain exerciseName
app.get("/getExerciseWithName", async (req, res, next) => {
  exerciseModel.getExerciseWithName(req.query)
  .then(x => res.send(x))
  .catch(next)
})
// Adds an exercise
// Expects body to contain exerciseName, caloriesPerHour, type
app.post("/", async (req, res, next) => {
  exerciseModel.add(req.body)
  .then(x => res.send(x))
  .catch(next)
})


// Equivalent to return for require
module.exports = app;


