const express = require("express");

const app = express.Router();
const userFriendModel = require("../models/user-friend");

// Mapping routes to functions
app.get("/", async (req, res, next) => {
  userFriendModel.getAll()
  .then(x => res.send(x))
  .catch(next)
});
// Get Friends for a user id
// Returns user id / first name / last name for each friend
app.get("/getFriends", async (req, res, next) => {
  console.log("getFriends");
  userFriendModel.getFriends(req.query.id)
  .then(x => res.send(x))
  .catch(next)
})
app.get("/getNonFriends", async (req, res, next) => {
  console.log("getNonFriends");
  userFriendModel.getNonFriends(req.query.id)
  .then(x => res.send(x))
  .catch(next)
})
// Add a friend for a user id. 
// Expects body to contain id1 and id2 fields.
app.post("/addFriend", async (req, res, next) => {
  userFriendModel.addFriend(req.body)
  .then(x => res.send(x))
  .catch(next)
})
// Remove friend for a user id. 
// Expects body to contain id1 and id2 fields.
app.post("/removeFriend", async (req, res, next) => {
  userFriendModel.removeFriend(req.body)
  .then(x => res.send(x))
  .catch(next)
})


// Equivalent to return for require
module.exports = app;

