const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inventorySchema= new Schema({
    type: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    hokiePID: {
        type: String,
        required: false,
    },
    quantity: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
    }
});

module.exports = Inventory = mongoose.model('inventory', inventorySchema);