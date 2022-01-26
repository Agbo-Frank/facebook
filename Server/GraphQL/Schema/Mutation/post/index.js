const { GraphQLString } = require("graphql");
const User = require('../../../../Model/User')
const Post = require('../../../../Model/Post');
const Comment = require("../../../../Model/Comment");
const CommentType = require("../../CommentType");


module.exports = {
    deletePost: {
        type: GraphQLString,
        args: {
            id: {type: GraphQLString},
            userId: {type: GraphQLString}
        },
        async resolve(parent, args){
            let { id, userId } = args
            try{
                let post = await Post.findOne({ _id: id})
                console.log(post._doc.userId)
                if(post._doc.userId == userId){
                    let res = await Post.findOneAndRemove({ _id: id})
                    if(res){
                        return "deleted"
                    }
                }
            }
            catch(err){
                throw err
            }
        }
    },
    makeComment: {
        type: CommentType,
        args: {
            userId: {type: GraphQLString},
            postId: {type: GraphQLString},
            text: {type: GraphQLString},
        },
        resolve(parent, args){
            let { userId, postId, text} = args
            return Comment.create({
                userId,
                postId,
                text
            })
        }
    },
    deleteComment: {
        type: GraphQLString,
        args: {
            id: {type: GraphQLString},
            userId: {type: GraphQLString}
        },
        async resolve(parent, args){
            let { id, userId } = args
            try{
                let post = await Comment.findOne({ _id: id})
                if(post._doc.userId == userId){
                    let res = await Comment.findOneAndRemove({ _id: id})
                    if(res){
                        return "deleted"
                    }
                }
            }
            catch(err){
                throw err
            }
        }
    },
}