const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rajinsalatyuk');

const user = require('../models/user');

var createUser = ((req,res) => {
  let newUser = new user({
    username: req.body.username,
    count: 0,
    location: req.body.location
  });
  newUser.save((err, createdUser) => {
    res.send(err ? err : `User is successfully created.`);
  });
});

var showUsers = ((req,res) => {
  user.find((err,users) => {
    res.send(err ? err : users);
  });
});

var showUser = ((req,res) => {
  let id = req.params.id;
  user.find({_id:id}, (err,user) => {
    res.send(err? err : user);
  });
});

var updateUser = ((req,res) => {
  let id = req.params.id;
  user.findByIdAndUpdate(id, { $inc: {count: 1}}, function(err, user){
    res.send(err ? err : `Count is updated for ${user.username}`);
  });
});

var deleteUser = ((req,res) => {
  let id = req.params.id;
  user.findByIdAndRemove(id, (err,user) => {
    res.send(err ? err : `${user.username} is deleted.`);
  });
});

module.exports = {
  createUser,
  showUsers,
  showUser,
  updateUser,
  deleteUser
};
