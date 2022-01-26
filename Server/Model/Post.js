const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    text: String,
    images: [String],
    likes: [String]
}, { timestamps: true })

module.exports = mongoose.model('post', postSchema)