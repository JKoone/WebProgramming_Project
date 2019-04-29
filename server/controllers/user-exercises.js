const express = require("express");

const app = express.Router();
const userExerciseModel = require("../models/user-exercise");

// Mapping routes to functions
app.get("/", async (req, res, next) => {
  userExerciseModel.getAll()
  .then(x => res.send(x))
  .catch(next)
})
// getExercisesForDate
// Expects query to contain userID, date
app.get('/getExercisesForDate', async (req, res, next) => {
  userExerciseModel.getExercisesForDate(req.query)
  .then(x => res.send(x))
  .catch(next)
})
// addExerciseForUser
// Expects body to contain userID, exerciseID, date and duration
app.post("/addExerciseForUser", async (req, res, next) => {
  userExerciseModel.addExerciseForUser(req.body)
  .then(x => res.send(x))
  .catch(next)
})



// Equivalent to return for require
module.exports = app;

