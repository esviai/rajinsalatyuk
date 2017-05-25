const url =  `http://muslimsalat.com/`;
const end = `/daily.json?key=654f798a989f8b5cffccd98ba5b0daa6`;
const util = require('../helpers/util');
require('dotenv').config();
var Twit = require('twit');
var getJSON = require('get-json');
var convertTime = require('convert-time');

var T = new Twit({
  consumer_key:process.env.CONSUMER_KEY,
  consumer_secret:process.env.CONSUMER_SECRET,
  access_token:process.env.ACCESS_TOKEN,
  access_token_secret:process.env.ACCESS_TOKEN_SECRET
})

var latestTweet = function() {
  T.get('statuses/user_timeline', { count: 1 }, function(err, data) {
    if(err) console.log(err)
    if(data[0]) {
      var latest_tweet_id = data[0].id;
    } else {
      var latest_tweet_id = false;
    }
    console.log('Searching tweet')
    searchTweet(latest_tweet_id)
  })
}

var searchTweet = function(since) {
  if(since) {
    T.get('search/tweets', { q: `#rajinsalatyuk since_id:${since}`})
    .then(result => {
      console.log(result.data.statuses.length)
      result.data.statuses.forEach(data => {
        let status = {}

        status.username = data.user.screen_name;
        status.status_id = data.id_str;

        let context = data.text;
        context = context.split(',')
        let completeURL = `${url}${context[0]}${end}`
        if(context[1]) {
          context[1] = context[1].trim();
          let request = context[1].split(' ');
          var time = util.requestGen(request[0])
        }
        if(time) status.specific = time;
        getJSON(completeURL, function(err, response) {
          if(response) {
            status.time = response.items;
            status.place = response.query;
          }
          if(status.time == undefined) {
            defaultTweet(status)
          } else {
            status.time = status.time[0];
            if(status.specific == undefined) {
              replyAll(status)
            } else {
              replyOne(status)
            }
          }
        })
      })
      if(!result) console.log('No #rajinsalatyuk tweet detected')
    })
    .catch(err => {
      console.log(err)
    })
  }
}

var replyAll = function(content) {
  let waktu = {
    subuh: convertTime(content.time.fajr),
    zuhur: convertTime(content.time.dhuhr),
    ashar: convertTime(content.time.asr),
    maghrib: convertTime(content.time.maghrib),
    isha: convertTime(content.time.isha)
  }
  let hasil = `subuh ${waktu.subuh} zuhur ${waktu.zuhur} ashar ${waktu.ashar} maghrib ${waktu.maghrib} isya ${waktu.isha}`
  T.post('statuses/update', { status: `@${content.username} Waktu sholat di ${content.place} adalah ${hasil} (waktu setempat)`, in_reply_to_status_id: content.status_id }, function(err, data) {
    console.log('Reply all data to user ' + content.username)
  })
}

var replyOne = function(content) {
  let request = content.specific[1];
  let hasil = convertTime(content.time[request]);
  T.post('statuses/update', { status: `@${content.username} Waktu sholat ${content.specific[0]} di ${content.place} adalah jam ${hasil} waktu setempat. Yuk shalat!`, in_reply_to_status_id: content.status_id }, function(err, data) {
    console.log('Reply specific data to user ' + content.username)
  })
}

var defaultTweet = function(content) {
  T.post('statuses/update', { status: `@${content.username} Untuk mengetahui waktu sholat di tempatmu, tweet nama lokasi dengan #rajinsalatyuk!`, in_reply_to_status_id: content.status_id }, function(err, data) {
    console.log('Reply default to user ' + content.username)
  })
}

var execute = function(req, res, send) {
  setInterval(latestTweet, 60000)
}

execute()

module.exports = {
  execute
};