const express = require('express');
const app = express().Router();

const {Favorite} = require('./models/Favorite');
const {auth} = require('./middleware/auth');

app.post('/favoriteNumber', auth, (req, res) => {

    Favorite.find({"movieID": req.body.movieID})
        .exec((err, favorite) => {
            if(err) return res.status(400).send(err);
            
            res.status(200).json({success: true, FavoriteNumber: favorite.length})
        })
})

module.exports = router;