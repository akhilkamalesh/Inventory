const functionalities = require('../controllers/functionalities');
const Inventory = require('../schemas/inventory');
const ErrorResponse = require('../utils/ErrorResponse');

/*
    @desc findInvetory finds the inventory based on req.params.name in the mongoose inventory database
    Can be searched either with hokiePID or with name
*/

exports.findInventory = async (req, res, next) => {

    // Console logging for dev
    console.log("find inventory called".blue);

    try {

        const query = {"name": req.params.name};

        const query2 = {"hokiePID": req.params.name};

        const inventory = await Inventory.findOne(query);

        const inventoryPID = await Inventory.findOne(query2);

        if(!inventory && !inventoryPID){

            return res.status(400).json({success: false, body: "inventory was not found"}); 

        }

        if(inventory){
            return res.status(200).json({success: true, body: inventory}); 
        }

        if(inventoryPID){
            return res.status(200).json({success: true, body: inventoryPID});
        }

    } catch (err) {
        
        next(new ErrorResponse(`error was found ${err}`, 400));
    }
}

/*
    @desc findAll returns all the inventory objects in the Inventory collection
*/
exports.findAll = async (req, res, next) => {

    try {
        const inventories = await Inventory.find();

        res.status(200).json({sucess: true,  total: inventories.length, data: inventories});

    } catch (err) {

        next(new ErrorResponse(`Error was ${err}`, 400))
        //res.status(400).json({sucess: false});

    }

}

/* 
    @desc createInventory creates the inventory based on what gets passed in the body
*/

exports.createInventory = async (req, res, next) => {

    console.log("create inventory called".blue);

    try {

        const query = {"name": req.body.name}

        // Making sure there are no duplicate documents
        if(await Inventory.findOne(query)){

            return res.status(400).json({
                success: false,
                message: "object is already in database. Only need to update or delete"
            });
        }

        const inventory = await Inventory.create(req.body);

        // send 201 since we are creating an entity
        res.status(201).json({
            success: true,
            data: inventory
        });

    } catch (err) {

        next(new ErrorResponse(`Error was ${err}`, 400));

    }
}

/*
    @desc updates the inventory based on what is passed in in req.params.id and what get's passed into the body
*/
exports.updateInventory = async (req, res, next) => {

    console.log("update inventory called".blue);

    try {
        // Grabs the inventory we want to update
        // Using the body is updates those specific criteria
        // Body in postman should be in JSON
        const inventory = await Inventory.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if(!inventory){
            res.status(404).json({
                success: false,
                message: `inventory was not found`
            });
        }

        res.status(200).json({sucess: true, data: inventory});
        
    } catch (err) {
        
        next(new ErrorResponse(`Error was ${err}`, 400))
 
    }
}

/*
    @desc deletes inventory based on id passed in req.params.id
*/
exports.deleteInventory = async(req, res, next) => {

    console.log("delete inventory is called".blue);

    try {

        const inventory = await Inventory.findByIdAndDelete(req.params.id);
        

        if(inventory){
            console.log(inventory);
        }

        if(!inventory){
            res.status(404).json({
                success: false,
                message: `inventory was not found`
            });
        }

        res.status(200).json({sucess: true, data: {}});
        
    } catch (err) {

        next(new ErrorResponse(`Error was ${err}`, 400))

    }

}