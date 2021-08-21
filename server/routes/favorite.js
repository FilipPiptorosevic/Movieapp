const express = require('express');
const app = express.Router();

const {Favorite} = require('../models/Favorite');
const {auth} = require('../middleware/auth');

app.post('/favoriteNumber', (req, res) => {

    Favorite.find({"movieID": req.body.movieID})
        .exec((err, num) => {
            if(err) return res.status(400).send(err);
            
            res.status(200).json({success: true, favoriteNumber: num.length})
        });
});

app.post('/favorited', (req, res) => {

    Favorite.find({"movieID": req.body.movieID, "userFrom": req.body.userFrom})
        .exec((err, sub) => {
            if(err) return res.status(400).send(err);

            let added = false;

            if(sub.length !== 0) {
                added = true;
            }

            res.status(200).json({success: true, favorited: added});

        })
});

app.post('/addToFavorite', (req, res) => {

    const favorite = new Favorite(req.body);

    favorite.save((err, doc) => {
        if(err) return res.json({success: false, err});
        return res.status(200).json({success: true, doc});
    })
});

app.post('/removeFromFavorite', (req, res) => {

    Favorite.findOneAndDelete({movieID: req.body.movieID, userFrom: req.body.userFrom})
        .exec((err, doc) => {
            if(err) return res.status(400).json({success: false, err});
            return res.status(200).json({success: true, doc});
        })
});

app.post('/getFavorites', (req, res) => {

    
    Favorite.find({'userFrom': req.body.userFrom})
        .exec((err, favorites) => {
            if(err) return res.status(400).send(err);
            res.status(200).json({success: true, favorites});
        })

});

module.exports = app;