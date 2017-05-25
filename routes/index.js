const express = require('express');
const router = express.Router();

const schedulerController = require('../controllers/schedulerTweet')
const searchTweet = require('../controllers/searchTweet')

// Test cron
router.get('/',schedulerController.allCity)

// Search and reply tweet
router.get('/reply', searchTweet.replyTweet)

module.exports = router;