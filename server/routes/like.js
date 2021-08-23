const express = require('express');
const app = express.Router();
const { Like } = require("../models/Like");
const { Dislike } = require("../models/Dislike");

const { auth } = require("../middleware/auth");


app.post("/getLikes", (req, res) => {

    let variable = {}
    if (req.body.movieID) {
        variable = { movieID: req.body.movieID }
    } else {
        variable = { commentID: req.body.commentID }
    }

    Like.find(variable)
        .exec((err, likes) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, likes })
        })


})


app.post("/getDislikes", (req, res) => {

    let variable = {}
    if (req.body.movieID) {
        variable = { movieID: req.body.movieID }
    } else {
        variable = { commentID: req.body.commentID }
    }

    Dislike.find(variable)
        .exec((err, dislikes) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, dislikes })
        })

})


app.post("/upLike", (req, res) => {

    let variable = {}
    if (req.body.movieID) {
        variable = { movieID: req.body.movieID, userID: req.body.userID }
    } else {
        variable = { commentID: req.body.commentID , userID: req.body.userID }
    }

    const like = new Like(variable)
    //save the like information data in MongoDB
    like.save((err, likeResult) => {
        if (err) return res.json({ success: false, err });
        //In case disLike Button is already clicked, we need to decrease the dislike by 1 
        Dislike.findOneAndDelete(variable)
            .exec((err, disLikeResult) => {
                if (err) return res.status(400).json({ success: false, err });
                res.status(200).json({ success: true })
            })
    })

})




app.post("/unLike", (req, res) => {

    let variable = {}
    if (req.body.movieID) {
        variable = { movieID: req.body.movieID, userID: req.body.userID }
    } else {
        variable = { commentID: req.body.commentID , userID: req.body.userID }
    }

    Like.findOneAndDelete(variable)
        .exec((err, result) => {
            if (err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true })
        })

})


app.post("/unDisLike", (req, res) => {

    let variable = {}
    if (req.body.movieID) {
        variable = { movieID: req.body.movieID, userID: req.body.userID }
    } else {
        variable = { commentID: req.body.commentID , userID: req.body.userID }
    }

    Dislike.findOneAndDelete(variable)
    .exec((err, result) => {
        if (err) return res.status(400).json({ success: false, err })
        res.status(200).json({ success: true })
    })


})


app.post("/upDisLike", (req, res) => {

    let variable = {}
    if (req.body.movieID) {
        variable = { movieID: req.body.movieID, userID: req.body.userID }
    } else {
        variable = { commentID: req.body.commentID , userID: req.body.userID }
    }

    const disLike = new Dislike(variable)
    //save the like information data in MongoDB
    disLike.save((err, dislikeResult) => {
        if (err) return res.json({ success: false, err });
        //In case Like Button is already clicked, we need to decrease the like by 1 
        Like.findOneAndDelete(variable)
            .exec((err, likeResult) => {
                if (err) return res.status(400).json({ success: false, err });
                res.status(200).json({ success: true })
            })
    })


})



module.exports = app;