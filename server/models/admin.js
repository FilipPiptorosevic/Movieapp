const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const adminSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5,
    },
    role: {
        type: Number,
        default: 1
    },
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
});

adminSchema.pre('save', function( next ) {
    var admin = this;
    
    if(admin.isModified('password')){    
        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err);
    
            bcrypt.hash(admin.password, salt, function(err, hash){
                if(err) return next(err);
                admin.password = hash 
                next()
            })
        })
    } else {
        next()
    }
});

adminSchema.methods.comparePassword = function(plainPassword, callb) {
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if(err) return callb(err);
        callb(null, isMatch);
    });
}

adminSchema.methods.generateToken = function(callb) {
    var admin = this;
    var token = jwt.sign(admin._id.toHexString(), 'secret');

    admin.token = token;
    admin.save(function (err, user) {
        if(err) return callb(err);
        callb(null, admin);
    })
}

adminSchema.statics.findByToken = function(token, callb) {
    var admin = this;

    jwt.verify(token, 'secret', function(err, decode){
        admin.findOne({"_id":decode, "token":token}, function(err, admin) {
            if(err) return callb(err);
            callb(null, admin);
        })
    })

}

const Admin = mongoose.model('Admin', adminSchema);
module.exports = {Admin};