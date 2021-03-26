
const mongoose = require('mongoose');


const blockSchema =new mongoose.Schema({

    index:Number,
    transactions:[],
    previoushash:String,
    hash:String,
    nonce:Number,
    merkleroot:String,
    timestamp:Number

});

var Block = mongoose.model('Block',blockSchema);

module.exports.Block = Block;