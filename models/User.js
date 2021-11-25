const mongoose = require("mongoose")
const bcrypt = require("bcrypt")


const UserSchema = mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address:{
        state: String,
        town: String
    },
    createAt: {
        type: Date,
        default: new Date()
    }
})

UserSchema.pre('save', function(next){
    const user = this

    bcrypt.hash(user.password, 10, function(error, encrypted){
        user.password = encrypted
        next()
    })
})

UserSchema.path("email").validate(val => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
  }, "Invalid e-mail.");
  

module.exports = mongoose.model("User", UserSchema)