const express = require('express');
const router = express.Router();

const {findInventoryByName, findInventoryByPID, findAll, createInventory, updateInventory, deleteInventory, deleteInventoryByLocation, findInventoryByLocation} = require('../controllers/functionalities');

const Inventory = require('../schemas/inventory');
const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/Auth');


// Need id to be delete and update from system
// Can find id by using find with name or hokiePID
router.route('/:id')
    .put(protect, authorize('admin'), updateInventory)
    .delete(protect, authorize('admin'), deleteInventory);

// Create and findAll do not need a parameter
router.route('/')
    .post(protect, authorize('admin'), createInventory)
    .get(protect, advancedResults(Inventory), findAll);

// findInventory need the name passed in from req.params
router.route('/:name/name')
    .get(protect, findInventoryByName);

// findInventoryByPID needs the pid passed into it
router.route('/:pid/PID')
    .get(protect, findInventoryByPID);

// deleteInventoryByLocation needs the pid passed into it
router.route('/:location/location')
    .get(protect, findInventoryByLocation)
    .delete(protect, authorize('admin'), deleteInventoryByLocation);

module.exports = router;