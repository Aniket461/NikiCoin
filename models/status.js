const mongoose = require('mongoose');

const StatusSchema = new mongoose.Schema({
    index:Number,
    status:String,
    timestamp:Number,
    message:String
    
});

var Status = mongoose.model('Status',StatusSchema);

module.exports.Status = Status;