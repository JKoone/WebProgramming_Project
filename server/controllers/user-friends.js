const express = require("express");

const app = express.Router();
const userFriendModel = require("../models/user-friend");

// Mapping routes to functions
app.get("/", (req, res) => {
  userFriendModel.getAll((err, data) => {
    if(err) throw err;
    res.send(data);
  })
});
// Get Friends for a user id
// Returns user id / first name / last name for each friend
app.get("/getFriends", (req, res) => {
  userFriendModel.getFriends(req.query.id, (err, data) => {
    if(err){ 
      res.status(400).send({error: err})
      return
    }
    res.send(data)
  })
})
// Add a friend for a user id. 
// Expects body to contain id1 and id2 fields.
app.post("/addFriend", (req, res) => {
  userFriendModel.addFriend(req.body, (err,data) => {
    if(err){ 
      res.status(400).send({error: err})
      return
    }
    res.send(data);
  })
})
// Remove friend for a user id. 
// Expects body to contain id1 and id2 fields.
app.post("/removeFriend", (req, res) => {
  userFriendModel.removeFriend(req.body, (err, data) => {
    if(err){ 
      res.status(400).send({error: err})
      return
    }
    res.send(data);
  })
})


// Equivalent to return for require
module.exports = app;

