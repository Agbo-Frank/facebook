const { 
    GraphQLObjectType, 
    GraphQLString
} = require('graphql')

const NotificationType = new GraphQLObjectType({
    name: 'Notification',
    fields: () => ({
        _id: {type: GraphQLString},
        userId: {type: GraphQLString},
        text: {type: GraphQLString}
    })
})

module.exports = NotificationType