const express = require('express');
const router = express.Router();

const schedulerController = require('../controllers/schedulerTweet');
const searchTweet = require('../controllers/searchTweet');
const lebaranTweet = require('../controllers/lebaranTweet');

// Test cron
router.get('/',schedulerController.allCity);

router.get('/test', (req,res) => {
  res.render('webspeechdemo');
});

// Search and reply tweet
router.get('/reply', searchTweet.execute);

// Lebaran tweet
router.get('/sudahlebaran', lebaranTweet.create);
module.exports = router;
