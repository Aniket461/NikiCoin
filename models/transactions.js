const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({

    From:String,
    To:String,
    amount:Number,
    timestamp:Number,
    signature:String,
    index:Number,
    confirm: String
});

var Transaction = mongoose.model('Transaction',TransactionSchema);

module.exports.Transaction = Transaction;