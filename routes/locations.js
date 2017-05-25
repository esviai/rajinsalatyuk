const express = require('express');
const router = express.Router();
const crud = require('../controllers/locationCrud');

router.post('/', crud.createLocation);
router.get('/', crud.showLocations);
router.get('/:id', crud.showLocation);
router.put('/:id', crud.updateLocation);
router.delete('/:id', crud.deleteLocation);

module.exports = router;
