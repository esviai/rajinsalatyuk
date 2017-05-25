const express = require('express');
const router = express.Router();
const crud = require('../controllers/userCrud');

router.post('/', crud.createUser);
router.get('/', crud.showUsers);
router.get('/:id', crud.showUser);
router.put('/:id', crud.updateUser);
router.delete('/:id', crud.deleteUser);

module.exports = router;
