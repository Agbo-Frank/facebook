const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLInt, 
    GraphQLList, 
    GraphQLID 
} = require('graphql')
const User = require('../../Model/User')

const FriendType = new GraphQLObjectType({
    name: 'Friend',
    fields: () => ({
        _id: { type: GraphQLID },
        userId: { 
            type: GraphQLString,
            resolve(parent){
                let ids = parent.forEach(i => {
                    return i.userId
                })
            }
        },
        request: { 
            type: new GraphQLList(require('./UserType')),
            resolve(parent, args){
                let ids = parent.map(i => {
                    return i.request
                })
                if(ids.length !== 0){
                    return User.find({ _id: ids})
                }
                return null
            }
        },
        awaitResponse: { 
            type: new GraphQLList(require('./UserType')),
            resolve(parent){
                let ids = parent.map(i => {
                    return i.awaitResponse
                })
                if(ids.length !== 0){
                    return User.find({ _id: ids})
                }
                return null
            }
        },
        follower: { 
            type: new GraphQLList(require('./UserType')),
            resolve(parent){
                let ids = parent.map(i => {
                    return i.follower
                })
                if(ids.length !== 0){
                    return User.find({ _id: ids})
                }
                return null
            }
        },
        followed: { 
            type: new GraphQLList(require('./UserType')),
            resolve(parent){
                let ids = parent.map(i => {
                    return i.followed
                })
                if(ids.length !== 0){
                    return User.find({ _id: ids})
                }
                return null
            }
        },
    })
})

module.exports = FriendType