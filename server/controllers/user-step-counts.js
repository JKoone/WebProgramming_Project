const express = require("express");

const app = express.Router();
const userStepCountModel = require("../models/user-step-count");

// Mapping routes to functions
app.get("/", async (req, res, next) => {
  userStepCountModel.getAll()
  .then(x => res.send(x))
  .catch(next)
});
// getStepCountForDate
// Expects query to contain id and date fields
// Returns the entry
app.get('/getStepCountForDate', async (req, res, next) => {
  console.log(req.query);
  userStepCountModel.getStepCountForDate(req.query)
  .then(x => res.send(x[0]))
  .catch(next)
});
// getStepCountSinceDate
// Expects query to contain id and date fields
// Returns all of the entries on or after the date passed
app.get('/getStepCountSinceDate', async (req, res, next) => {
  userStepCountModel.getStepCountSinceDate(req.query)
  .then(x => res.send(x))
  .catch(next)
});
// setStepCountForDate
// Expects body to contain id, date and value fields
// If a value exists for a date, the value is updated
app.post('/setStepCountForDate', async (req, res, next) => {
  userStepCountModel.setStepCountForDate(req.body)
  .then(x => res.send(x))
  .catch(next)
})


// Equivalent to return for require
module.exports = app;


