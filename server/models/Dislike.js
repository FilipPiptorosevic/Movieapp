const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dislikeSchema = mongoose.Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    commentID: {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    },
    movieID: {
        type: String
    }
}, {timestamps: true});


const Dislike = mongoose.model('Dislike', dislikeSchema);
module.exports = {Dislike};