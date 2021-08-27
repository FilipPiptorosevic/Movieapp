const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    commentID: {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    },
    postID: {
        type: String
    },
    responseTo: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String
    }

}, {timestamps: true});


const Comment = mongoose.model('Comment', commentSchema);
module.exports = {Comment};