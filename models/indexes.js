const mongoose = require('mongoose');

const IndexSchema = new mongoose.Schema({
    name:String,
    index:Number
});

var IndexModel = mongoose.model('Indexes',IndexSchema);

module.exports.IndexModel = IndexModel;