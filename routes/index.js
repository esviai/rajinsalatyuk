const express = require('express');
const router = express.Router();
const schedulerController = require('../controllers/schedulerTweet')

//Test cron
router.get('/',schedulerController.Scheduler)

module.exports = router;
