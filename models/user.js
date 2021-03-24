const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    name:String,
    email:String,
    password:String,
    publickey:String
});

var User = mongoose.model('User',UserSchema);

module.exports.User = User;