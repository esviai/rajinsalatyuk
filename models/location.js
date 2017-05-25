var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var locationSchema = new Schema ({
  name: {
    type: String,
    required: true
  },
  count: {
    type: Number,
  },
  users: [{
    type: String,
    ref: 'user'
  }]
});

var location  = mongoose.model('location',locationSchema);
module.exports = location;
