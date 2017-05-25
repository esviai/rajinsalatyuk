const express = require('express');
const router = express.Router();
const crud = require('../controllers/locationuserCrud');

router.post('/', crud.updateOrCreate);
router.get('/:id', crud.getLocations);

module.exports = router;
