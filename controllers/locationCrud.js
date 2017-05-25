const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rajinsalatyuk');

const location = require('../models/location');

var createLocation = ((req,res) => {
  let newLocation = new location({
    name: req.body.name,
    count: 0,
    users: req.body.user
  });
  newLocation.save((err, createdLocation) => {
    res.send(err ? err : `Location is successfully created.`);
  });
});

var showLocations = ((req,res) => {
  location.find((err,locations) => {
    res.send(err ? err : locations);
  });
});

var showLocation = ((req,res) => {
  let id = req.params.id;
  location.find({_id:id}, (err,location) => {
    res.send(err? err : location);
  });
});

var updateLocation = ((req,res) => {
  let id = req.params.id;
  location.findByIdAndUpdate(id, { $inc: {count: 1}}, function(err, location){
    res.send(err ? err : `Count is updated for ${location.name}`);
  });
});

var deleteLocation = ((req,res) => {
  let id = req.params.id;
  location.findByIdAndRemove(id, (err,location) => {
    res.send(err ? err : `${location.name} is deleted.`);
  });
});

module.exports = {
  createLocation,
  showLocations,
  showLocation,
  updateLocation,
  deleteLocation
};
