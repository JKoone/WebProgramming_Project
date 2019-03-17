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
// getStepCountForDate
// Expects query to contain id and date fields
// Returns the entry
app.get('/getStepCountForDate', (req, res) => {
  userStepCountModel.getStepCountForDate(req.query, (err, data) => {
    if(err){
      res.status(500).send({error: err.message})
      return
    }
    res.send(data)
  })
})
// getStepCountSinceDate
// Expects query to contain id and date fields
// Returns all of the entries on or after the date passed
app.get('/getStepCountSinceDate', (req, res) => {
  userStepCountModel.getStepCountSinceDate(req.query, (err, data) => {
    if(err){
      res.status(500).send({error: err.message})
      return
    }
    res.send(data)
  })
})
// setStepCountForDate
// Expects body to contain id, date and value fields
// If a value exists for a date, the value is updated
app.post('/setStepCountForDate', (req, res) => {
  userStepCountModel.setStepCountForDate(req.body, (err, data) => {
    if(err){
      res.status(500).send({error: err.message})
      return
    }
    res.send(data)
  })
})


// Equivalent to return for require
module.exports = app;


