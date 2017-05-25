const express = require('express');
const router = express.Router();
const searchTweet = require('../controllers/searchTweet')

router.get('/', searchTweet.replyTweet)

module.exports = router;