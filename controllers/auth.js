require('dotenv').config();
const sec = process.env.JWT_SECRET;

var admin = require('../models/admin');
var bcrypt = require('bcrypt');
const saltRounds = 10;

var jwt = require('jsonwebtoken');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rajinsalatyuk');

var adminLogin = function(req, res, next) {
  let username = req.body.username
  let password = req.body.password

  admin.findOne({ username: username }, function(err, admin) {
    if(err) res.send(err);
    bcrypt.compare(password, admin.password)
    .then(result => {
      if(result) {
        var token = jwt.sign({username: username}, sec);
        res.send(token)
      } else {
        res.send('Password salah');
      }
    })
  })
}

var adminOnly = function(req, res, next) {
  let token = req.headers.token

  if(token) {
    jwt.verify(token, sec, (err, decoded) => {
      if(decoded.username == 'rajinsalatyuk') {
        next()
      } else {
        res.send('Route only for admin')
      }
    })
  } else {
    res.send('Not logged in')
  }
}

module.exports = {
  adminLogin, adminOnly
};