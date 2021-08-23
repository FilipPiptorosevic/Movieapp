const express = require('express');
const app = express.Router();
const {User} = require('../models/user');
const {auth} = require('../middleware/auth');

app.get('/auth', auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role
    });
});


app.post('/register', (req, res) => {
    const user = new User(req.body);

    user.save((err, doc) => {
        if(err) return res.json( {success: false, err} );

        return res.status(200).json({
            success: true,
            userData: doc
        });
    });
});


app.post('/login', (req, res) => {


    User.findOne({email: req.body.email}, (err, user) => {
        if(!user) {
            return res.json({loginSuccess: false});
        } else {
            user.comparePassword(req.body.password, (err, isMatch) => {
                if(!isMatch) {
                    return res.json({loginSuccess: false});
                } else {
                    user.generateToken((err, user) => {
                        if(err) return res.status(400).send(err);
                        res.cookie("w_authExp", user.tokenExp);
                        res.cookie("w_auth", user.token).status(200).json({loginSuccess: true, userId: user._id});
                    });
                }
            });
        }
    });
})


app.get('/logout', auth, (req, res) => {

    User.findOneAndUpdate({_id: req.user._id}, {token: "", tokenExp: ""}, (err, doc) => {
        if(err) return res.json({success: false, err});
        return res.status(200).send({success: true, doc});
    })
})


module.exports = app;