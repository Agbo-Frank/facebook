const { GraphQLSchema } = require('graphql')
const RootQuery = require('./Queries')
const RootMutation = require('./Mutation')

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
})

module.exports =schema