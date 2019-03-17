const express = require("express");

const app = express.Router();
const userExerciseModel = require("../models/user-exercise");

// Mapping routes to functions
app.get("/", (req, res) => {
  userExerciseModel.getAll((err, data) => {
    if(err){
      res.status(400).send({error: err})
      return
    }
    res.send(data)
  })
})
// getExercisesForDate
// Expects query to contain userID, date
app.get('/getExercisesForDate', (req, res) => {
  userExerciseModel.getExercisesForDate(req.query, (err, data) => {
    if(err){
      res.status(400).send({error: err})
      return
    }
    res.send(data)
  })
})
// addExerciseForUser
// Expects body to contain userID, exerciseID, date and duration
app.post("/addExerciseForUser", (req, res) => {
  userExerciseModel.addExerciseForUser(req.body, (err, data) => {
    if(err){
      res.status(400).send({error: err})
      return
    }
    res.send(data)
  })
})



// Equivalent to return for require
module.exports = app;

