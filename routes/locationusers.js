const express = require('express');
const router = express.Router();
const crud = require('../controllers/locationuserCrud');
const auth = require('../controllers/auth');

router.post('/', auth.adminOnly, crud.updateOrCreate);
router.get('/:id', auth.adminOnly, crud.getLocations);

module.exports = router;
