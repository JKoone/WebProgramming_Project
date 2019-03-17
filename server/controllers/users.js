const express = require('express');

const app = express.Router();
const userModel = require('../models/user');
const userPolicy = require('../policies/user-policy')
// Mapping routes to functions
app.get('/', (req, res) => {
  userModel.getAll((err, data) => {
    if(err){
      res.status(400).send({error: err})
      return
    }
    res.send(data);
  })
});
// Login 
// Login user with a username and password. 
// Returns error if login information not correct
app.post('/login', (req, res) => {
  console.log(req.body)
  userModel.login(req.body, (err, data) => {
      if(err){ 
        res.status(400).send({error: err})
        return
      }
      res.send(data)
  })
})
// Register
// Register a user with an email and password
// Creates a new user if new user criteria is met (valid and new email / password) 
app.post('/register', (req, res) => {
  // Check if the email / password is valid
  const err = userPolicy.register(req.body)
  // userPolicy sets the res.status, so we just need to return
  if(err) {
    res.status(400).send({error: err})
    return
  }
  // Check if this email already exists
  userModel.register(req.body, (err, data) => {
    if(err) {
      res.status(500).send({error:err.message})
      return
    }
    res.send(data)
  })
})
// Update
// General purpose update method to user
// Mass update approach where all of the fields are updated
// FirstName, LastName, Age, Height, Weight, UpdatedAt
app.post('/update', (req, res) => {
  userModel.update(req.body, (err, data) => {
    if(err){
      res.status(500).send({error: err.message})
      return
    }
    res.send(data)
  })
})
// Update Height
// Expects body to have a height value and id
app.post('/updateHeight', (req, res) => {
  userModel.updateHeight(req.body, (err, data) => {
    if(err){
      res.status(500).send({error: err.message})
      return
    }
    res.send(data)
  })
})
// Update Weight
// Expects body to have a weight value and id
app.post('/updateWeight', (req, res) => {
  userModel.updateWeight(req.body, (err, data) => {
    if(err){
      res.status(500).send({error: err.message})
      return
    }
    res.send(data)
  })
})
// Update Age
// Expects body to have a age value and id
app.post('/updateAge', (req, res) => {
  userModel.updateAge(req.body, (err, data) => {
    if(err){
      res.status(400).send({error: err.message})
      return
    }
    res.send(data)
  })
})
// Update Password
// Checks if the new password is valid for the user policy
// Expects body to have a NewPassword and id
app.post('/updatePassword', (req,res) => {
  // Check if the password is valid according to our policy
  const error = userPolicy.updatePassword(req.body.NewPassword)
  if(error){
    res.status(400).send({error: error})
    return
  }
  // Password is valid, try to update it
  userModel.updatePassword(req.body, (err, data) => {
    if(err){
      res.status(500).send({error:err.message})
    }
    res.send(data)
  })
})

// Equivalent to return for require
module.exports = app


