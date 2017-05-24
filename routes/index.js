const express = require('express');
const router = express.Router();
const schedulerController = require('../controllers/schedulerTweet')

//Test cron
router.get('/',schedulerController.test)

module.exports = router;
