const express = require('express');
const router = express.Router();
const crud = require('../controllers/locationuserCrud');

router.post('/', crud.updateOrCreate);

module.exports = router;
