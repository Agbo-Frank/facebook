const { GraphQLObjectType } = require('graphql')
const user = require('./user')
const post = require('./post')

const RootMutation = new GraphQLObjectType({
    name: "RootMutation",
    fields: {
       ...user,
       ...post
    }
})

module.exports = RootMutation