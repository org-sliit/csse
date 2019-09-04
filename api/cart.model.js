const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let Cart = new Schema({
    pid: {
        type: String
    },
    pname: {
        type: String
    },


    psprice: {
        type: String
    },

    pqty: {
        type: String
    },
    pcategory: {

        type:String

    },

    description:{

        type:String
    }

},{

    collection: 'cart'
});

module.exports = mongoose.model('Cart', Cart);