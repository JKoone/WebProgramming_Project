const express = require("express");

const app = express.Router();
const userContactMethodModel = require("../models/user-contact-method");

// Mapping routes to functions
app.get("/", (req, res) => {
  userContactMethodModel.getAll((err, data) => {
    if(err){ 
      res.status(400).send({error: err})
      return
    }
    res.send(data)
  })
})
// getAllContactMethodsForUser
// Expects querty to contain userID
app.get("/getAllContactMethodsForUser", (req, res) => {
  userContactMethodModel.getAllContactMethodForUser(req.query, (err, data) => {
    if(err){ 
      res.status(400).send({error: err})
      return
    }
    res.send(data)
  })
})
// Get Contact type
// Expects query to contain userID and type
app.get("/getContactTypeForUser", (req, res) => {
  userContactMethodModel.getContactTypeForUser(req.query, (err, data) => {
    if(err){ 
      res.status(400).send({error: err})
      return
    }
    res.send(data)
  })
})
// General Post Add contact method
// Expects body to contain userID, type and value fields
app.post("/", (req, res) => {
  userContactMethodModel.add(req.body, (err, data) => {
    if(err){ 
      res.status(400).send({error: err})
      return
    }
    res.send(data)
  })
})


// Equivalent to return for require
module.exports = app;

