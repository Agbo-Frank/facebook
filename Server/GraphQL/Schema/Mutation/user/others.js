const { GraphQLString } = require('graphql')
const User = require('../../../../Model/User')
const Friend = require('../../../../Model/Friend')
const { sendNotification } = require('../../../../utils/helpFunc')


module.exports = {
    sendFriendRequest: {
        type: GraphQLString ,
        args: {
            userId: { type: GraphQLString },
            friendId: { type: GraphQLString }
        },
        async resolve(parent, args){
            let { userId, friendId } = args
            try {
                let user = await Friend.findOne({userId})
                let userinfo = await User.findOne({_id: userId})
                let friend = await Friend.findOne({ userId: friendId})
                if(!user){
                    user = await Friend.create({
                        userId
                    })
                }
                if(!friend){
                    friend = await Friend.create({
                        userId: friendId
                    })
                }
                if(user._doc){
                    let res = await Friend.updateOne({ userId }, {
                        $addToSet: {
                            awaitResponse: friendId
                        }
                    })
                    if(res.acknowledged){
                        res = await Friend.updateOne({ userId: friendId}, {
                            $addToSet: {
                                request: userId
                            }
                        })
                        if(res.acknowledged){
                            sendNotification(friendId, `${userinfo.firstName} ${userinfo.lastName} sent you a resquest`)
                            return "friend request sent"
                        }
                    }
                }
            } catch (error) {
                throw error
            }
        }
    },
    acceptRequest: {
        type: GraphQLString,
        args: {
            userId: { type: GraphQLString },
            friendId: { type: GraphQLString }
        },
        resolve(parent, args){
            let { userId, friendId } = args
            return Friend.findOne({ userId })
                .then(user => {
                    if(user._doc){
                        return Friend.updateOne({ userId },
                            {
                                $pull: {
                                    request: friendId
                                }
                            })
                            .then(res1 => {
                                if(res1.acknowledged){
                                    return Friend.updateOne({ userId },
                                        {
                                            $addToSet: {
                                                followers: friendId
                                            }
                                        })
                                        .then(res2 => {
                                            if(res2.acknowledged){
                                                return Friend.updateOne({ userId: friendId },
                                                {
                                                    $pull: {
                                                        awaitResponse: userId
                                                    }
                                                })
                                                .then(res3 => {
                                                    if(res3.acknowledged){
                                                        return Friend.updateOne({ userId: friendId },
                                                            {
                                                                $addToSet: {
                                                                    followed: userId
                                                                }
                                                            })
                                                            .then(res4 => {
                                                                User.findOne({_id: userId})
                                                                    .then(userinfo => {
                                                                        sendNotification(friendId, `${userinfo.firstName} ${userinfo.lastName} declined your resquest`)
                                                                    })
                                                                    .catch(err => console.log(err))
                                                                if(res4.acknowledged) return "Accepted"
                                                            }).catch(err => {throw err})
                                                    }
                                                }).catch(err => {throw err})
                                            }
                                        }).catch(err => {throw err})
                                }
                            }).catch(err => {throw err})

                    }
                })
                .catch(err => {throw err})
        }

    },
    declineRequest: {
        type: GraphQLString,
        args: {
            userId: { type: GraphQLString },
            friendId: { type: GraphQLString }
        },
        resolve(parent, args){
            let { userId, friendId } = args

            return Friend.findOne({ userId })
                .then(user => {
                    if(user._doc){
                        return Friend.updateOne({ userId },
                            {
                                $pull: {
                                    request: friendId
                                }
                            })
                            .then(res2 => {
                                if(res2.acknowledged){
                                    return Friend.updateOne({ userId: friendId },
                                    {
                                        $pull: {
                                            awaitResponse: userId
                                        }
                                    })
                                    .then(res3 => {
                                        if(res3.acknowledged){
                                            //send notification
                                            User.findOne({_id: userId})
                                            .then(userinfo => {
                                                sendNotification(friendId, `${userinfo.firstName} ${userinfo.lastName} declined your resquest`)
                                            })
                                            .catch(err => console.log(err))
                                            
                                            return  "Accepted"
                                        }
                                    }).catch(err => {throw err})
                                }
                            }).catch(err => {throw err})
                    }
                })
                .catch(err => {throw err})
        } 
    }
}