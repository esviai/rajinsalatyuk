var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var adminSchema = new Schema ({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

var admin  = mongoose.model('admin',adminSchema);
module.exports = admin;
