const url =  `http://muslimsalat.com/`
const end = `/daily.json?key=654f798a989f8b5cffccd98ba5b0daa6`
require('dotenv').config();
var Twit = require('twit')
var getJSON = require('get-json')

var T = new Twit({
  consumer_key:process.env.CONSUMER_KEY,
  consumer_secret:process.env.CONSUMER_SECRET,
  access_token:process.env.ACCESS_TOKEN,
  access_token_secret:process.env.ACCESS_TOKEN_SECRET
})

var latestTweet = function() {
  T.get('statuses/user_timeline', { count: 1 })
  .then(result => {
    console.log('Searching for tweet')
    let latest_tweet_id = result.data[0].id
    searchTweet(latest_tweet_id)
  })
}

var searchTweet = function(since) {
  T.get('search/tweets', { q: `#rajinsalatyuk since_id:${since}`})
  .then(result => {
    result.data.statuses.forEach(data => {
      let status = {}

      status.username = data.user.screen_name;
      status.status_id = data.id_str;

      let context = data.text;
      context = context.split(',')
      let completeURL = `${url}${context[0]}${end}`
      let request = context[1]

      getJSON(completeURL, function(err, response) {
        status.time = response.items;
        status.place = response.query;
        if(status.time == undefined) {
          defaultTweet(status)
        } else {
          status.time = status.time[0];
          replyTweet(status)
        }
      })
    })
  })
}

var replyTweet = function(content) {
  let hasil = `subuh ${content.time.fajr} zuhur ${content.time.dhuhr} ashar ${content.time.asr} maghrib ${content.time.maghrib} isha ${content.time.isha}`
  T.post('statuses/update', { status: `@${content.username} Waktu sholat di ${content.place}, ${hasil}!`, in_reply_to_status_id: content.status_id }, function(err, data) {
    console.log('Reply data kepada user ' + content.username)
    console.log(data)
  })
}

var defaultTweet = function(content) {
  T.post('statuses/update', { status: `@${content.username} Untuk mengetahui waktu sholat di tempatmu, tweet nama lokasi dengan #rajinsalatyuk!`, in_reply_to_status_id: content.status_id }, function(err, data) {
    console.log('Reply default kepada user ' + content.username)
  })
}

var execute = function(req, res, send) {
  setInterval(latestTweet, 10000)
}

execute()