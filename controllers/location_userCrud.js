const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rajinsalatyuk');

const location_user = require('../models/location_user');

var createLocation_user = ((req,res) => {
  let newLocation_user = new location_user({
    userid: req.body.userid,
    locationid: req.body.locationid
  });
  newLocation_user.save((err, createdLocation_user) => {
    res.send(err ? err : `Location_user is successfully created.`);
  });
});

var showLocation_users = ((req,res) => {
  location_user.find((err,location_users) => {
    res.send(err ? err : location_users);
  });
});

var showLocation_user = ((req,res) => {
  let id = req.params.id;
  location_user.find({_id:id}, (err,location_user) => {
    res.send(err? err : location_user);
  });
});

var updateLocation_user = ((req,res) => {
  let id = req.params.id;
  location_user.findByIdAndUpdate(id, {$set: {userid: req.body.userid,locationid: req.body.locationid}}, (err, location_user) => {
    res.send(err ? err : `Location_user is updated`);
  });
});

var deleteLocation_user = ((req,res) => {
  let id = req.params.id;
  location_user.findByIdAndRemove(id, (err,location_user) => {
    res.send(err ? err : `Location_user relation is deleted.`);
  });
});

var getLocationOfUsers = ((req,res) => {
});
module.exports = {
  createLocation_user,
  showLocation_users,
  showLocation_user,
  updateLocation_user,
  deleteLocation_user
};
