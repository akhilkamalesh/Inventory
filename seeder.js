/*
    Seeds through a JSON file then adds the documents (items) from the JSON file into mongoose database
*/

const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load dotenv var
dotenv.config({path: './config/config.env'});

// Load model
const Inventory = require('./schemas/Inventory');

// Connect to DB
mongoose.connect("mongodb://localhost:27017/inventory", {
    useNewUrlParser: true,
    useUnifiedTopology: true
    // useCreateIndex: true,
    // useFindAndModify: false
});

// Read JSON Files
// Main method that converts the the JSON from the inventory.json to inventories
const inventories = JSON.parse(fs.readFileSync(`${__dirname}/_data/inventory.json`, 'utf-8'));

// Import into DB
const importData = async() => {
    try{
        await Inventory.create(inventories); // Creates inventory based on inventories
        console.log('Data Imported....'.green.inverse)
        process.exit();
    } catch(err){
        console.log(err);
    }
}

// Delete data
const deleteData = async() => {
    try{
        await Inventory.deleteMany();
        console.log('Data Destroyed....'.red.inverse)
        process.exit();
    } catch(err){
        console.log(err);
    }
}

if(process.argv[2] === '-i'){
    importData();
}else if(process.argv[2] === '-d'){
    deleteData();
}