const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList} = require('graphql')

const CommentType = new GraphQLObjectType({
    name: "Comment",
    fields: () => ({
        _id: { type: GraphQLID },
        postId: { type: GraphQLID },
        userId: { type: GraphQLID },
        text: {type: GraphQLString},
        likes: { type: new GraphQLList(GraphQLString)},
        replies: { type: new GraphQLList(GraphQLString)}
    })
})

module.exports = CommentType