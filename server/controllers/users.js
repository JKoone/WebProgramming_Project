const express = require('express');

const app = express.Router();
const userModel = require('../models/user');
const userPolicy = require('../policies/user-policy')
// Mapping routes to functions
app.get('/', async (req, res, next) => {
  userModel.getAll()
  .then(x => res.send(x) )
  .catch(next)
});
app.get('/getUserWithID', async (req, res, next) => {
  userModel.get(req.query.id)
  .then(x => res.send(x) )
  .catch(next)
});
// Login 
// Login user with a username and password. 
// Returns error if login information not correct
app.post('/login', async (req, res, next) => {
  userModel.login(req.body)
  .then(x => res.send(x))
  .catch(next)
})
// Register
// Register a user with an email and password
// Creates a new user if new user criteria is met (valid and new email / password) 
app.post('/register', async (req, res, next) => {
  // Check if the email / password is valid
  const err = userPolicy.register(req.body)
  // userPolicy sets the res.status, so we just need to return
  if(err) {
    //throw Error({error: err});
    next(err);
  }
  // Check if this email already exists
  userModel.register(req.body)
  .then(x => res.send(x))
  .catch(next)
})
// Update
// General purpose update method to user
// Mass update approach where all of the fields are updated
// FirstName, LastName, Age, Height, Weight, UpdatedAt
app.post('/update', async (req, res, next) => {
  console.log(req.body);
  userModel.update(req.body)
  .then(x => res.send(x))
  .catch(next)
})
// Update Height
// Expects body to have a height value and id
app.post('/updateHeight', async (req, res, next) => {
  userModel.updateHeight(req.body)
  .then(x => res.send(x))
  .catch(next)
})
// Update Weight
// Expects body to have a weight value and id
app.post('/updateWeight', async (req, res, next) => {
  userModel.updateWeight(req.body)
  .then(x => res.send(x))
  .catch(next)
})
// Update Age
// Expects body to have a age value and id
app.post('/updateAge', async (req, res, next) => {
  userModel.updateAge(req.body)
  .then(x => res.send(x))
  .catch(next)
})
// Update Password
// Checks if the new password is valid for the user policy
// Expects body to have a NewPassword and id
app.post('/updatePassword', async (req, res, next) => {
  // Check if the password is valid according to our policy
  const error = userPolicy.updatePassword(req.body.NewPassword)
  if(error){
    next(error)
  }
  // Password is valid, try to update it
  userModel.updatePassword(req.body)
  .then(x => res.send(x))
  .catch(next)
})

// Equivalent to return for require
module.exports = app


