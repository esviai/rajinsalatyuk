const express = require('express');
const router = express.Router();

const schedulerController = require('../controllers/schedulerTweet');
const searchTweet = require('../controllers/searchTweet');
const lebaranTweet = require('../controllers/lebaranTweet');
const auth = require('../controllers/auth');

// Test cron
router.get('/', schedulerController.allCity);

// Search and reply tweet
router.get('/reply', searchTweet.execute);

// Lebaran tweet
router.get('/sudahlebaran', lebaranTweet.create);

// Credentials
router.post('/signin', auth.adminLogin);

module.exports = router;
