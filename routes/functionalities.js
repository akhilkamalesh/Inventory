const express = require('express');

const router = express.Router();

const {findInventory, findAll, createInventory, updateInventory, deleteInventory} = require('../controllers/functionalities');

router.route('/:id')
    .get(findInventory)
    .put(updateInventory)
    .delete(deleteInventory);

router.route('/')
    .post(createInventory)
    .get(findAll)

module.exports = router;