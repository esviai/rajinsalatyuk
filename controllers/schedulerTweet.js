const CronJob = require('cron').CronJob;
const Twit = require('twit');
const getJSON = require('get-json')


var T = new Twit({
consumer_key:process.env.CONSUMER_KEY, //consumer key
consumer_secret:process.env.CONSUMER_SECRET, //consumer secret
access_token:process.env.ACCESS_TOKEN, //test user token
access_token_secret:process.env.ACCESS_TOKEN_SECRET, //test user secret
timeout_ms:60*1000,  // optional HTTP request timeout to apply to all requests.
})

const Tweeter = function() {
  T.post('statuses/update', { status: ``},
    function(err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
      }
  })
}



const Scheduler = function(req,res) {
  console.log("Masuk Scheduler");
  var timePattern = `05 * * * * *`
  new CronJob(timePattern, function() {
    getJSON('http://muslimsalat.com/Jakarta/daily.json?key=654f798a989f8b5cffccd98ba5b0daa6', function(error, response){
     if (response) {
       var salatTime = []
       let fajr = response.items[0].fajr.split("").
       let dhuhr = response.items[0].dhuhr.split("")
       let asr = response.items[0].asr.split("")
       let maghrib = response.items[0].maghrib.split("")
       let isha = response.items[0].isha.split("")
       console.log(fajr,dhuhr,asr,maghrib,isha);
      //  console.log(salatTime.push().push().push().push().push());
     } else {
       console.log(error)
     }
    })
    console.log("Jalan");
  } ,
  function() {
  } ,true)
  res.send("Bismillah")
}

module.exports = {
  Scheduler
};
