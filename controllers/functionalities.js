/*
    controllers/functionalities.js includes all the methods that handle the functionalities of an inventory system
 */

const Inventory = require('../schemas/inventory');
const ErrorResponse = require('../utils/ErrorResponse');
const asyncHandler = require('../middleware/async');


/*
    @desc findInvetory finds the inventory based on req.params.name in the mongoose inventory database
    Returns all the inventory with the same name (relates to location)
    @route /api/v1/inventory/:name/name
*/

exports.findInventoryByName = asyncHandler(async (req, res, next) => {

    // Console logging for dev
    console.log("find inventory by name called".blue);


        const query = {"name": req.params.name};
        const inventory = await Inventory.find(query);

        // With any error, return next to call the next piece of middleware
        // since errors are now handles with middleware
        if(!inventory){
            return next(new ErrorResponse(`Inventory was not found with query of ${req.params.name}`, 404)); 
        }

        if(inventory){
            return res.status(200).json({success: true, body: inventory}); 
        }
});

/*
    @desc findInvetory finds the inventory based on req.params.pid in the mongoose inventory database
    Can be searched with hokiePID
    @route /api/v1/inventory/:pid/PID
*/

exports.findInventoryByPID = asyncHandler(async (req, res, next) => {

    // Console logging for dev
    console.log("find inventory by PID called".blue);


        const query2 = {"hokiePID": req.params.pid};
        const inventoryPID = await Inventory.find(query2);

        // With any error, return next to call the next piece of middleware
        // since errors are now handles with middleware
        if(!inventoryPID){

            return next(new ErrorResponse(`Inventory was not found with query of ${req.params.pid}`, 404)); 

        }

        if(inventoryPID){
            return res.status(200).json({success: true, body: inventoryPID});
        }
});

/*
    @desc findInventoryByLocation finds the inventory based on req.params.pid in the mongoose inventory database
    Can be searched with location
    @route /api/v1/inventory/:location/location
*/

exports.findInventoryByLocation = asyncHandler(async (req, res, next) => {

    // Console logging for dev
    console.log("find inventory by location called".blue);

        const query = {"location": req.params.location};
        const inventory = await Inventory.find(query);

        // With any error, return next to call the next piece of middleware
        // since errors are now handles with middleware
        if(!inventory){

            return next(new ErrorResponse(`Inventory was not found with query of ${req.params.location}`, 404)); 

        }

        if(inventory){
            return res.status(200).json({success: true, body: inventory});
        }
});

/*
    @desc findAll returns all the inventory objects in the Inventory collection
*/
exports.findAll = asyncHandler(async (req, res, next) => {

    // Don't need this line anymore since we have advancedMiddleware running our query now
    // const inventories = await Inventory.find();
    res.status(200).json(res.advancedResults);

});

/* 
    @desc createInventory creates the inventory based on what gets passed in the body
*/

exports.createInventory = asyncHandler(async (req, res, next) => {

    console.log("create inventory called".blue);

    const query = {"name": req.body.name, "location": req.body.location}

    let inventory = await Inventory.findOne(query);

    // Making sure there are no duplicate documents that have same name and location
    if(inventory){

        return next(new ErrorResponse(`Inventory is already in system`, 404))
    }

    inventory = await Inventory.create(req.body);

    // send 201 since we are creating an entity
    res.status(201).json({
        success: true,
        data: inventory
    });

});

/*
    @desc updates the inventory based on what is passed in in req.params.id and what get's passed into the body
*/
exports.updateInventory = asyncHandler(async (req, res, next) => {

    console.log("update inventory called".blue);

    // Grabs the inventory we want to update
    // Using the body is updates those specific criteria
    // Body in postman should be in JSON
    const inventory = await Inventory.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if(!inventory){
        return next(new ErrorResponse(`Inventory was not found with an id of ${req.params.id}`, 404))
    }

    res.status(200).json({sucess: true, data: inventory});

});

/*
    @desc deletes inventory based on id passed in req.params.id
*/
exports.deleteInventory = asyncHandler(async(req, res, next) => {

    console.log("delete inventory is called".blue);

    const inventory = await Inventory.findByIdAndDelete(req.params.id);
    
    // Prints inventory that gets deleted
    if(inventory){
        console.log(inventory);
    }

    if(!inventory){
        return next(new ErrorResponse(`Inventory was not found with an id of ${req.params.id}`, 404))
    }

    res.status(200).json({sucess: true, data: {}});
});

/*
    @desc deletes inventory based on location passed in req.params.location
*/
exports.deleteInventoryByLocation = asyncHandler(async(req, res, next) => {

    console.log("delete inventory by location".blue);

    const query = {"location": req.params.location}

    const inventory = await Inventory.deleteMany(query);

    if(!inventory){
        return next(new ErrorResponse(`Inventory was not found with an location of ${req.params.location}`, 404))
    }

    res.status(200).json({sucess: true, data: {}});
});

exports.alottInventory = asyncHandler(async(req, res, next) => {

    

});