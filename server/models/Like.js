const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = mongoose.Schema({
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


const Like = mongoose.model('Like', likeSchema);
module.exports = {Like};