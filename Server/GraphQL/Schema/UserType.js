const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLInt, 
    GraphQLList, 
    GraphQLID 
} = require('graphql')
const Friend = require('../../Model/Friend')
const Notification = require('../../Model/Notification')
const User = require('../../Model/User')
const Post = require('../../Model/Post')
const PostType = require('./PostType')
const FriendType = require('./FriendType')
const NotificationType = require('./NotificationType')


const LocationType = new GraphQLObjectType({
    name: 'Location',
    fields: () => ({
        address: { type: GraphQLString },
        city: { type: GraphQLString },
        LGA: { type: GraphQLString },
        state: { type: GraphQLString },
        country: { type: GraphQLString },
    })
})
const SchoolType = new GraphQLObjectType({
    name: "School",
    fields: () => ({
        name: { type: GraphQLString},
        duration: { type: new GraphQLList(GraphQLInt)},
        description: { type: GraphQLString},
    })
})
const SocialLinksTypes = new GraphQLObjectType({
    name: "SocialLinks",
    fields: () => ({
        name: { type: GraphQLString},
        link: { type: GraphQLString},
    })
})
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        _id: { type: GraphQLID },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        gender: { type: GraphQLString },
        age: { type: GraphQLInt },
        password: { type: GraphQLString },
        phoneNumber: { type: GraphQLInt },
        profilePics: { type: GraphQLString },
        coverPics: { type: GraphQLString },
        desc: { type: GraphQLString },
        friend: { 
            type: FriendType,
            resolve(parent, args){
                return Friend.find({ userId: parent._id })
            }
        },
        placesLived: { type: new GraphQLList(LocationType) },
        schools: { type: new GraphQLList(SchoolType) },
        socialLinks: { type: new GraphQLList(SocialLinksTypes) },
        languages: { type: new GraphQLList(GraphQLString) },
        posts: { 
            type: new GraphQLList(PostType),
            resolve(parent){
                return Post.find({ userId: parent._id })
            }
        },
        notifications: {
            type: new GraphQLList(NotificationType),
            resolve(parent){
                return Notification.find({ userId: parent._id })
            }
        }
    })
})

module.exports = UserType