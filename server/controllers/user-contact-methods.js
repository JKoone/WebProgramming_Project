const express = require("express");

const app = express.Router();
const userContactMethodModel = require("../models/user-contact-method");

// Mapping routes to functions
app.get("/", (req, res) => {
  userContactMethodModel.getAll((err, data) => {
    if(err) throw err;
    res.send(data);
  })
});

app.post("/", (req, res) => {
  userContactMethodModel.add({}, (err, data) => {
    if(err) throw err;
    //
  })
})


// Equivalent to return for require
module.exports = app;

