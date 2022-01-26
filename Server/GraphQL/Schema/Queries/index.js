const { GraphQLObjectType } = require('graphql')
const user = require('./user')

const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
       ...user
    }
})

module.exports = RootQuery