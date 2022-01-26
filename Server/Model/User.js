const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    gender: {
        type: String,
        enum: ["Male", "Female"]
    },
    age: Number,
    password: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    DOB: [Number],
    phoneNumber: Number,
    coverPics: String,
    profilePics: String,
    desc: String,
    friend: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'friend'
    },
    placesLived:[{
        address: String,
        city: String,
        LGA: String,
        state: String,
        country: String
    }],
    schools: [{
        name: String,
        duration: [Number],
        description: String
    }],
    socialLinks: [{
        name: String,
        link: String
    }], 
    languages: [String]
}, { timestamps: true })

module.exports = mongoose.model('user', userSchema)