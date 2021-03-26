const mongoose = require('mongoose');

const PendingTransactionSchema = new mongoose.Schema({

    From:String,
    To:String,
    amount:Number,
    timestamp:Number,
    signature:String,
    index:Number,
    confirm: String
});

var PendingTransaction = mongoose.model('PendingTransaction',PendingTransactionSchema);

module.exports.PendingTransaction = PendingTransaction;