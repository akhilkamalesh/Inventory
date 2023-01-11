const express = require('express');
const router = express.Router();

const {findInventoryByName, findInventoryByPID, findAll, createInventory, updateInventory, deleteInventory} = require('../controllers/functionalities');

const Inventory = require('../schemas/inventory');
const advancedResults = require('../middleware/advancedResults');


// Need id to be delete and update from system
// Can find id by using find with name or hokiePID
router.route('/:id')
    .put(updateInventory)
    .delete(deleteInventory);

// Create and findAll do not need a parameter
router.route('/')
    .post(createInventory)
    .get(advancedResults(Inventory), findAll);

// findInventory need the name passed in from req.params
router.route('/:name/name')
    .get(findInventoryByName);

router.route('/:pid/PID')
    .get(findInventoryByPID);

module.exports = router;