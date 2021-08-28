const express = require('express');
const app = express.Router();

const {Comment} = require('../models/Comment');
const {auth} = require('../middleware/auth');

app.post("/saveComment", auth, (req, res) => {

    const comment = new Comment(req.body);

    comment.save((err, comment) => {
        if(err) return res.json({success: false, err});

        Comment.find({'_id': comment._id})
        .populate('writer')
        .exec((err, result) => {
            if(err)return res.json({success: false, err});
            return res.status(200).json({success: true, result}); 
        })
    })
});

app.post("/getComments", (req, res) => {

    Comment.find({"postID": req.body.movieID})
        .populate('writer')
        .exec((err, comments) => {
            if(err) return res.status(400).send(err);
            return res.status(200).json({success: true, comments});
    })
});

app.post("/removeComment", (req, res) => {

    Comment.findOneAndDelete({_id: req.body._id})
        .exec((err, comment) => {
            if(err) return res.status(400).json({success: false, err});
            return res.status(200).json({success: true, comment});
        })

});

app.post("/removeChildComment", (req, res) => {

    Comment.findOneAndDelete({responseTo: req.body.responseTo})
        .exec((err, comment) => {
            if(err) return res.status(400).json({success: false, err});
            return res.status(200).json({success: true, comment});
        })

});



module.exports = app;