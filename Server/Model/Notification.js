const mongoose = require('mongoose')

const notificationSchema = new mongoose.Schema({
    userId: String,
    text: String
}, { timestamps: true})

module.exports = mongoose.model('notification', notificationSchema)