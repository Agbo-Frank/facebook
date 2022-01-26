const User = require('../Model/User')
const cloudinary = require('../utils/cloudinary')

module.exports.editUser = async (req, res) => {
    let { coverPics, profilePics } = req.body
    let userId = req.user

    try{
        let user = await User.updateOne({ _id: userId})
    }
    catch(err){
        res.status(400).json({err})
    }
}