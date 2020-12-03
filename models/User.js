const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    username : String,  
    email: String,
    password: String,
    thoughts: [mongoose.Schema.Types.ObjectId] ,
    friends: [mongoose.Schema.Types.ObjectId] ,
},
{ collection: "users" })

const User = mongoose.model('users', UserSchema);

module.exports = User