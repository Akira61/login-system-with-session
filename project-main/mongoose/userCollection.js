const mongoose = require('mongoose');
// Schema is to initialize specific document values
const register = mongoose.Schema({
    name : String,
    email : String,
    password : String,
    /*password: {
        type: String,
        minLength: 8, // minimum length
    },
    */
    date : String,
});

const session = mongoose.Schema({
    // getting user object id 
    userId: mongoose.SchemaTypes.ObjectId,
    session_id : {
        type : String,
        default: 'false'
    },
    
    date: String,
    ip_address: String,
});

// module is to create collection with the name given 
module.exports.register = mongoose.model('register', register);
module.exports.session = mongoose.model('user-session',session);