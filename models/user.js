var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema ({
  username: {
    type: String,
    required: true
  },
  count: {
    type: Number,
  },
  locations: [{
    type: String,
    ref: 'location'
  }]
});

var user  = mongoose.model('user',userSchema);
module.exports = user;
