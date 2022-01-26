const Post = require('../Model/Post')
const Friend = require('../Model/Friend')
const User = require('../Model/User')
const { sendNotification } = require('../utils/helpFunc')

module.exports.createPost = async (req, res) => {
    let userId = req.user
    let { text, images } = req.body

    try{
        let newPost = await Post.create({
            userId,
            text 
        })
        let user = await User.findOne({ _id: userId })
        let friend = await  Friend.findOne({ userId })
    
        if(user && friend){
            let friendIds = friend.followers.concat(friend.followed)
            let text = `${user.firstName} ${user.firstName} Added a Story`
            friendIds.forEach(id => sendNotification(id, text))

            res.status(200).json({ post: newPost })
        }
    }
    catch(err){
        res.status(400).json({ err })
    }

}