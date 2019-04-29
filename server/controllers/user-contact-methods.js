const express = require("express");

const app = express.Router();
const userContactMethodModel = require("../models/user-contact-method");

// Mapping routes to functions
app.get("/", async (req, res, next) => {
  userContactMethodModel.getAll()
  .then(x => res.send(x))
  .catch(next)
})
// getAllContactMethodsForUser
// Expects querty to contain userID
app.get("/getAllContactMethodsForUser", async (req, res, next) => {
  userContactMethodModel.getAllContactMethodForUser(req.query)
  .then(x => res.send(x))
  .catch(next)
})
// Get Contact type
// Expects query to contain userID and type
app.get("/getContactTypeForUser", async (req, res, next) => {
  userContactMethodModel.getContactTypeForUser(req.query)
  .then(x => res.send(x))
  .catch(next)
})
// General Post Add contact method
// Expects body to contain userID, type and value fields
app.post("/", async (req, res, next) => {
  userContactMethodModel.add(req.body)
  .then(x => res.send(x))
  .catch(next)
})


// Equivalent to return for require
module.exports = app;

