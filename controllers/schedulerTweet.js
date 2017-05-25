const CronJob = require('cron').CronJob;
const Twit = require('twit');
const getJSON = require('get-json')
const util = require('../helpers/util')

var T = new Twit({
consumer_key:process.env.CONSUMER_KEY, //consumer key
consumer_secret:process.env.CONSUMER_SECRET, //consumer secret
access_token:process.env.ACCESS_TOKEN, //test user token
access_token_secret:process.env.ACCESS_TOKEN_SECRET, //test user secret
timeout_ms:60*1000,  // optional HTTP request timeout to apply to all requests.
})

// const dailyScheduler = function(req, res) {
//   getJSON('http://muslimsalat.com/Jakarta/daily.json?key=654f798a989f8b5cffccd98ba5b0daa6', function(err, response) {
//     if(err) console.log(err);
//     let prayerData = {};
//
//   })
// }

const allCity = function(req, res) {
  res.send('Bismillah')
  let cities = ['Banda Aceh','Medan','Pekanbaru','Batam','Palembang','Pangkal Pinang', 'Jambi', 'Bengkulu', 'Padang', 'Bandar Lampung', 'Serang', 'Jakarta', 'Bandung', 'Semarang','Yogyakarta','Surabaya','Pontianak','Palangkaraya'];
  cities.forEach(city => {
    dailyScheduler(city)
  })
}

const dailyScheduler = function(city) {
  console.log("Masuk Scheduler");
  // var timePattern = `* * * * * *`
  new CronJob(`00 27 20 * * * `, function() {
    getJSON(`http://muslimsalat.com/${city}/daily.json?key=654f798a989f8b5cffccd98ba5b0daa6`, function(error, response){
     if (response) {
       var salatTime = []
       var fajr = util.patternMaker(response.items[0].fajr, 1)
       var dhuhr = util.patternMaker(response.items[0].dhuhr)
       var asr = util.patternMaker(response.items[0].asr)
       var maghrib = util.patternMaker(response.items[0].maghrib)
       var isha = util.patternMaker(response.items[0].isha)
       salatTime.push(fajr, dhuhr, asr, maghrib, isha)
       console.log(salatTime);
       salatName = ['Subuh', 'Dzuhur', 'Ashar', 'Maghrib', 'Isya'];
       salatTime.forEach(timePattern => {
         let name = salatName[0];
         Tweeter(timePattern, name, city);
         salatName.shift();
       })
     } else {
       console.log(error)
     }
    })
    console.log("Jalan");
  } ,
  null
  ,true)
}

const Tweeter = function(timePattern, name, city) {
  console.log("Masuk Tweeter");
  console.log(timePattern);
  new CronJob(timePattern, function () {
    console.log("Cron JOb Created");
    T.post('statuses/update', { status: `Waktu sholat ${name} untuk wilayah ${city} dan sekitarnya`},
      function(err, data) {
        if (err) {
          console.log(err);
        } else {
          console.log(data);
        }
    })
    this.stop()
  }, null ,true)
}

module.exports = {
  allCity
};
