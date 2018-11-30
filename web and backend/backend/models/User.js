'use strict';

/*********************************************************
 Created  by Swam Didam Bobby on 09/08/2018
 Modified by Swam Didam Bobby on 13/08/2018
/********************************************************/

// model dependencies

const
    mongoose                = require("mongoose"),
    bcrypt                  = require("bcryptjs");


// MONGOOSE MODEL CONFIGURATION
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    phone: {
        type: String,
    },
    title: {
        type: String,
    },
    department: {
        type: String,
    },
    userName: {
        type: String,
    },
    password:{
        type: String
    }
});

UserSchema.pre('save', function(next) {
    var User = this;
    bcrypt.hash(User.password, 10, function(err, hash) {
        if(err)
        {
            return next(err);
        }
        User.password = hash;
        next();
    })
})

UserSchema.statics.authenticate = function (userName, password, callback){
    var User = this;
    User.findOne({ userName: userName}).exec(function (err, User) {
        if(err) {
            return callback(err);
        }
        if(!User) {
            var err = new Error('User not found');
            err.status = 401;
            return callback(err);
        }
        bcrypt.compare(password, User.password, function(err, result) {
            if (result === true) {
                return callback(null, User);
            }
            else
            {
                return callback();
            }
            
        })
    })
}


module.exports = mongoose.model('User', UserSchema);

