const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rajinsalatyuk');

const location = require('../models/location');
const user = require('../models/user');
const userCrud = require('./userCrud.js');

var updateOrCreate = ((req,res) => {
  let locationName = req.body.location;
  let username = req.body.username;
  // check whether user is already in the database
  user.findOne({username:username},(err, resUser) => {
    if (err) { //find user is error
      res.send(err);
    }
    else {
      // if user is found
      if (resUser) {
        resUser.count += 1;
        // check whether user already has the location
        if (resUser.locations.includes(locationName)) {
          resUser.save((err, updatedUser) => {
            location.findOne({name:locationName}, (err, resLocation) => {
              resLocation.count += 1;
              resLocation.save((err, updatedLoc) => {
                res.send(err ? err : `User and location are updated`);
              });
            });
          });
        }
        else {
          resUser.locations.push(locationName);
          resUser.save((err, updatedUser) => {
            location.findOne({name:locationName}, (err, resLocation) => {
              if(resLocation) {
                resLocation.count += 1;
                resLocation.users.push(username);
                resLocation.save((err, updatedLoc) => {
                  res.send(err ? err : `User and location are updated`);
                });
              }
              else {
                let newLocation = new location({
                  name: locationName,
                  count: 1,
                  users: username
                });
                newLocation.save((err, createdLoc) => {
                  res.send(err ? err : `User is updated and location is created`);
                });
              }
            });
          });
        }
      }

      // if user is not found
      else {
        // create new user
        let newUser = new user({
          username: username,
          count: 1,
          locations: locationName
        });
        newUser.save((err, createdUser) => {
          // check whether location is already in the database
          location.findOne({name:locationName}, (err, resLocation) => {
            // found the location
            if (resLocation){
              resLocation.count += 1;

              // check whether location has the username
              //if (!resLocation.users.includes(username)) {
              resLocation.users.push(username);
              resLocation.save((err, updatedLoc) => {
                res.send(err ? err : `User is created and location is updated`);
              });
              //}
              //else {
              //  resLocation.save((err, updatedLoc) => {
              //    res.send(err ? err : `User is created and location is updated`);
              //  });
              //};
            }

            // can't find the location
            else {
              // create new location
              let newLocation = new location({
                name: locationName,
                count: 1,
                users: username
              });
              newLocation.save((err, createdLocation) => {
                res.send(err ? err : `User and location are created`);
              });
            }
          });
        });
      }
    }
  });
});

var getLocations = ((req,res) => {
  let id = req.params.id;
  user.findById(id, (err, user) => {
    let locations = user.locations.join(', ');
    res.send(`@${user.username} telah pergi ke ${locations} selama bulan Ramadan.`);
  });
});

module.exports = {
  updateOrCreate,
  getLocations
};
