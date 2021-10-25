const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        minLength: 6,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        validate(val){
            if(!validator.isEmail(val)) throw new Error('Not A Valid Email');
        }
    },
    password:{
        type: String,
        required: true,
        unique: true,
        minLength: 6
    }
});

const User = mongoose.model('User',userSchema);

module.exports = User;