const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    text: String,
    likes: [String],
    replies: [String]
}, { timestamps: true })

module.exports = mongoose.model('comment', commentSchema)