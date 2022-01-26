const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList} = require('graphql')
const CommentType = require('./CommentType')
const Comment = require('../../Model/Comment')


const PostType = new GraphQLObjectType({
    name: "Post",
    fields: () => ({
        _id: { type: GraphQLID },
        userId: { type: GraphQLID },
        text: {type: GraphQLString},
        image: { type: GraphQLString },
        likes: { type: new GraphQLList(GraphQLString)},
        comments: { 
            type: new GraphQLList(CommentType),
            resolve(parent, args){
                return Comment.find({ postId: parent._id })
            }
        }
    })
})

module.exports = PostType