const CronJob = require('cron').CronJob;
const Twit = require('twit');

var T = new Twit({
consumer_key:process.env.CONSUMER_KEY, //consumer key
consumer_secret:process.env.CONSUMER_SECRET, //consumer secret
access_token:process.env.ACCESS_TOKEN, //test user token
access_token_secret:process.env.ACCESS_TOKEN_SECRET, //test user secret
timeout_ms:60*1000,  // optional HTTP request timeout to apply to all requests.
})

const time = function() {
  let randomizer = Math.ceil(Math.random()*10000000000000)
  T.post('statuses/update', { status: `${randomizer} Di twit tiap 1 detik #RajinSalatYuk`},
    function(err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
      }
  })
}

const test = function(req,res) {
  new CronJob('* * * * * *', time ,null ,true)
  res.send("Bismillah")
}

module.exports = {
  test
};
