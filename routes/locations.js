const express = require('express');
const router = express.Router();
const crud = require('../controllers/locationCrud');
const auth = require('../controllers/auth');

router.post('/', auth.adminOnly, crud.createLocation);
router.get('/', auth.adminOnly, crud.showLocations);
router.get('/:id', auth.adminOnly, crud.showLocation);
router.put('/:id', auth.adminOnly, crud.updateLocation);
router.delete('/:id', auth.adminOnly, crud.deleteLocation);

module.exports = router;
