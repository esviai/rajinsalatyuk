require('dotenv').config();
const Twit = require('twit');
const lu = require('./locationuserCrud');
const user = require('../models/user');
//const user = require('./userCrud');

var T = new Twit({
  consumer_key:process.env.CONSUMER_KEY,
  consumer_secret:process.env.CONSUMER_SECRET,
  access_token:process.env.ACCESS_TOKEN,
  access_token_secret:process.env.ACCESS_TOKEN_SECRET
});

var sleep = ((milliseconds) => {
  var start = new Date().getTime();
  for (var i=0; i<1e7; i++) {
    if ((new Date().getTime() - start > milliseconds)) {
      break;
    }
  }
});

var create = ((req,res) => {
  user.find((err,users) => {
    if (err) res.send(err);
    else {
      users.forEach((user) => {
        console.log(user);
        sleep(1000);
          T.post('statuses/update', {status: `@${user.username} Kamu sudah berkeliling ${user.locations.join(", ")} sepanjang Ramadan lho! Selamat Idulfitri!`}, (err,data) => {
            console.log(err ? err : data);
          });
      });
    };
  });
});


module.exports = {
  create
};
