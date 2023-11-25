const mongoose = require('mongoose');
const passportLocaleStrategy = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
    }
});

userSchema.plugin(passportLocaleStrategy);

const user = mongoose.model('User',userSchema);
module.exports = user;