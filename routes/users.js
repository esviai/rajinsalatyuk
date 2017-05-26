const express = require('express');
const router = express.Router();
const crud = require('../controllers/userCrud');
const auth = require('../controllers/auth');

router.post('/', auth.adminOnly, crud.createUser);
router.get('/', auth.adminOnly, crud.showUsers);
router.get('/:id', auth.adminOnly, crud.showUser);
router.put('/:id', auth.adminOnly, crud.updateUser);
router.delete('/:id', auth.adminOnly, crud.deleteUser);

module.exports = router;
