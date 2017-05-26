const express = require('express');
const router = express.Router();

const schedulerController = require('../controllers/schedulerTweet');
const searchTweet = require('../controllers/searchTweet');
const lebaranTweet = require('../controllers/lebaranTweet');
const getWaktuSalat = require('../controllers/getWaktuSalat');
const auth = require('../controllers/auth');
const ayat = require('../controllers/ayatRandomizer')

// Test cron
router.get('/', schedulerController.allCity);

router.get('/waktusalat', (req,res) => {
  res.render('index', { coba: false, ayat: false });
});

router.post('/waktusalat', getWaktuSalat.reply);

// Search and reply tweet
router.get('/reply', searchTweet.execute);

// Lebaran tweet
router.get('/sudahlebaran', lebaranTweet.create);

// Credentials
router.post('/signin', auth.adminLogin);

module.exports = router;
