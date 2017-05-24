require('dotenv').config();
var Twit = require('twit')
let url =  `http://muslimsalat.com/`
let end = `/daily.json?key=654f798a989f8b5cffccd98ba5b0daa6`

var T = new Twit({
  consumer_key:process.env.CONSUMER_KEY,
  consumer_secret:process.env.CONSUMER_SECRET,
  access_token:process.env.ACCESS_TOKEN,
  access_token_secret:process.env.ACCESS_TOKEN_SECRET
})

var latestTweet = function() {
  T.get('statuses/user_timeline', { count: 1 })
  .then(result => {
    let latest_tweet_id = result.data[0].id
    searchTweet(latest_tweet_id)
  })
}

var searchTweet = function(since) {
  T.get('search/tweets', { q: `#rajinsalatyuk since_id:${since}`})
  .then(result => {
    let statuses = []
    result.data.statuses.forEach(data => {
      let context = data.text;
      context = context.split(',')
      let complete = `${url}${context[0]}${end}`

    })
    console.log(statuses)
  })
}

var replyTweet = function(username, status_id) {
  T.post('statuses/update', { status: `@${username} coba ini!`, in_reply_to_status_id: status_id }, function(err, data) {
    console.log(data)
  })
}

var execute = function(req, res, send) {
  latestTweet();
}

// replyTweet('hakiemaul')

var getJSON = require('get-json')
let location = "bandung"
getJSON(`${url}${location}${end}`, function(error, response){

    error
    // undefined

    console.log(response.items)

})

