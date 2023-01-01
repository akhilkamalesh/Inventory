const express = require('express');

const router = express.Router();

const {findInventory, findAll, createInventory, updateInventory, deleteInventory, findInventoryPID} = require('../controllers/functionalities');

// Need id to be delete and update from system
// Can find id by using find with name or hokiePID
router.route('/:id')
    .put(updateInventory)
    .delete(deleteInventory);

// Create and findAll do not need a parameter
router.route('/')
    .post(createInventory)
    .get(findAll);

// findInventory need the name passed in from req.params
router.route('/:name')
    .get(findInventory);

module.exports = router;