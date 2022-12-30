const functionalities = require('../controllers/functionalities');
const Inventory = require('../schemas/inventory');

/*
    @desc findInvetory finds the inventory based on req.params.name in the mongoose inventory database
*/

exports.findInventory = async (req, res, next) => {

    // Console logging for dev
    console.log("find inventory called");

    try {

        const query = {"name": req.params.name};

        const inventory = await Inventory.findOne(query);

        if(!inventory){
            return res.status(400).json({success: false, message: "not found"});
        }

        
        return res.status(200).json({success: true, body: inventory});
    } catch (err) {
        
        return res.status(400).json({sucess: false, message: `error was found ${err}`});
    }
}

/*
    @desc findPID finds the inventory based on req.params.pid in the mongoose inventory database
*/

exports.findInventoryPID = async (req, res, next) => {

    // Console logging for dev
    console.log("find inventory called");

    try {

        const query = {"hokiePID": req.params.pid};

        const inventory = await Inventory.findOne(query);

        if(!inventory){
            return res.status(400).json({success: false, message: "not found"});
        }

        
        return res.status(200).json({success: true, body: inventory});
    } catch (err) {
        
        return res.status(400).json({sucess: false, message: `error was found ${err}`});
    }
}



exports.findAll = async (req, res, next) => {

    try {
        const inventories = await Inventory.find();

        res.status(200).json({sucess: true,  total: inventories.length, data: inventories});
    } catch (error) {
        res.status(400).json({sucess: false});
    }

}


exports.createInventory = async (req, res, next) => {

    console.log("create inventory called");

    try {

        const query = {"name": req.body.name}

        // Making sure there are no duplicate documents
        if(Inventory.findOne(query)){
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
        res.status(400).json({
            success: false,
            message: `error = ${err}`
        });   
    }
}

exports.updateInventory = async (req, res, next) => {

    console.log("update inventory called");

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
        res.status(400).json({
            success: false,
            message: `error = ${err}`
        });   
    }
}

exports.deleteInventory = async(req, res, next) => {

    console.log("delete inventory is called");

    try {

        const inventory = Inventory.findByIdAndDelete(req.params.id);
        
        if(!inventory){
            res.status(404).json({
                success: false,
                message: `inventory was not found`
            });
        }

        res.status(200).json({sucess: true, data: {}});
        
    } catch (err) {

        res.status(400).json({
            success: false,
            message: `error = ${err}`
        });   
    }

}