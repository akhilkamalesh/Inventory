const express = require('express');

const router = express.Router();

const {findInventory, findAll, createInventory, updateInventory, deleteInventory, findInventoryPID} = require('../controllers/functionalities');

// Need id to be delete from system
router.route('/:id')
    .delete(deleteInventory);

// Create and findAll do not need a parameter
router.route('/')
    .post(createInventory)
    .get(findAll)

// Find and Update need the name passed in from req.params
router.route('/:name')
    .get(findInventory)
    .put(updateInventory);

module.exports = router;