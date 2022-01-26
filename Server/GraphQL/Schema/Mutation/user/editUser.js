const { 
    GraphQLString,
    GraphQLInt, 
    GraphQLID, GraphQLList, GraphQLInputObjectType } = require('graphql')
const User = require('../../../../Model/User')

const SchoolType = new GraphQLInputObjectType({
    name: "SchoolInput",
    fields: () => ({
        name: { type: GraphQLString},
        duration: { type: new GraphQLList(GraphQLInt)},
        description: { type: GraphQLString},
    })
})
const SocialLinks = new GraphQLInputObjectType({
    name: "SocialLinksInput",
    fields: () => ({
        name: { type: GraphQLString},
        link: { type: GraphQLString},
    })
})
const LocationType = new GraphQLInputObjectType({
    name: 'LocationInput',
    fields: () => ({
        address: { type: GraphQLString },
        city: { type: GraphQLString },
        LGA: { type: GraphQLString },
        state: { type: GraphQLString },
        country: { type: GraphQLString },
    })
})

module.exports = {
    editUser: {
        type: GraphQLString,
        args: {
            firstName: { type: GraphQLString},
            lastName: { type: GraphQLString},
            gender: { type: GraphQLString},
            age: { type: GraphQLInt},
            email: { type: GraphQLString},
            phoneNumber: { type: GraphQLInt},
            desc: { type: GraphQLString},
            DOB: { type: GraphQLString},
            userId: { type: GraphQLString}
        },
        async resolve(parent, args){
            let { firstName, lastName,desc, DOB, 
                gender, age, email, phoneNumber, userId } = args

            if(DOB){
                let DOBArray = DOB.split(' ')
                DOB = DOBArray.map(d => parseInt(d))
            }

            try{
                let user = await User.findOne({ _id: userId})
                if(user._doc){
                    let res = await User.updateOne({ _id: userId }, {
                        firstName: firstName || user._doc.firstName,
                        lastName: lastName || user._doc.lastName,
                        gender: gender || user._doc.gender,
                        age: age || user._doc.age,
                        email: email || user._doc.email,
                        phoneNumber: phoneNumber || user._doc.phoneNumber,
                        desc: desc || user._doc.desc,
                        DOB: DOB || user._doc.DOB,
                    })
                    if(res.acknowledged){
                        return "Updated!"
                    }
                }
            }
            catch(err){
                throw err
            }
        }
    },
    addToSchool: {
        type: GraphQLString,
        args:{
            userId: { type: GraphQLID},
            schools: { type: new GraphQLList(SchoolType)}
        },
        async resolve(parent, args){
            let { userId, schools } = args
            try{
                let user = await User.findOne({ _id: userId})

                if(user){
                    let res = await User.updateOne({ _id: userId }, {
                        $addToSet: {
                            schools: {
                                $each: schools
                            }
                        }
                    })
                    if(res.acknowledged){
                        return "Successfully updated"
                    }
                    else{
                        return "Unsuccessfully"
                    }
                }
            }
            catch(err){
                throw err
            }
        }
    },
    addToSchool: {
        type: GraphQLString,
        args:{
            userId: { type: GraphQLID},
            schoolId: { type: GraphQLID}
        },
        async resolve(parent, args){
            let { userId, schoolId } = args
            try{
                let user = await User.findOne({ _id: userId})

                if(user){
                    let res = await User.updateOne({ _id: userId }, {
                        $pull: {
                            schools: {
                                _id: schoolId
                            }
                        }
                    })
                    if(res.acknowledged){
                        return "Successfully updated"
                    }
                    else{
                        return "Unsuccessfully"
                    }
                }
            }
            catch(err){
                throw err
            }
        }
    },
    removeLang: {
        type: GraphQLString,
        args: {
            userId: { type: GraphQLID },
            lang: { type: GraphQLString }
        },
        async resolve(parent, args){
            let { userId, lang } = args
            try{
                let user = await User.findOne({ _id: userId}) 
                if(user){
                    let res = await User.updateOne({ _id: userId}, {
                        $pull: {
                            languages: lang
                        }
                    })
                    if(res.acknowledged){
                        return "Successfully removed"
                    }
                    else{
                        return "Unsuccessfully"
                    }
                }
            }
            catch(err){
                throw err
            }
        }
    },
    addToLang: {
        type: GraphQLString,
        args: {
            userId: { type: GraphQLID },
            lang: { type: new GraphQLList(GraphQLString) }
        },
        async resolve(parent, args){
            let { userId, lang } = args
            try{
                let user = await User.findOne({ _id: userId}) 
                if(user){
                    let res = await User.updateOne({ _id: userId}, {
                        $addToSet: {
                            languages: { $each: lang }
                        }
                    })
                    if(res.acknowledged){
                        return "Successfully updated"
                    }
                    else{
                        return "Unsuccessfully"
                    }
                }
            }
            catch(err){
                throw err
            }
        }
    },
    addToSocialLinks: {
        type: GraphQLString,
        args: {
            userId: { type: GraphQLID },
            links: { type: new GraphQLList(SocialLinks) }
        },
        async resolve(parent, args){
            let { userId, links } = args
            try{
                let user = await User.findOne({ _id: userId}) 
                if(user){
                    let res = await User.updateOne({ _id: userId}, {
                        $addToSet: {
                            socialLinks: { $each: links }
                        }
                    })
                    if(res.acknowledged){
                        return "Successfully updated"
                    }
                    else{
                        return "Unsuccessfully"
                    }
                }
            }
            catch(err){
                throw err
            }
        }
    },
    removeSocialLinks: {
        type: GraphQLString,
        args: {
            userId: { type: GraphQLID },
            link: { type: GraphQLID  }
        },
        async resolve(parent, args){
            let { userId, link } = args
            try{
                let user = await User.findOne({ _id: userId}) 
                if(user){
                    let res = await User.updateOne({ _id: userId}, {
                        $pull: {
                            socialLinks: {_id: link} 
                        }
                    })
                    if(res.acknowledged){
                        return "Successfully updated"
                    }
                    else{
                        return "Unsuccessfully"
                    }
                }
            }
            catch(err){
                throw err
            }
        }
    },
    addToLoction: {
        type: GraphQLString,
        args: {
            userId: { type: GraphQLID },
            locations: { type: new GraphQLList(LocationType) }
        },
        async resolve(parent, args){
            let { userId, locations } = args
            try{
                let user = await User.findOne({ _id: userId}) 
                if(user){
                    let res = await User.updateOne({ _id: userId}, {
                        $addToSet: {
                            placesLived: { $each: locations }
                        }
                    })
                    if(res.acknowledged){
                        return "Successfully updated"
                    }
                    else{
                        return "Unsuccessfully"
                    }
                }
            }
            catch(err){
                throw err
            }
        }
    },
    removeLoction: {
        type: GraphQLString,
        args: {
            userId: { type: GraphQLID },
            locationId: { type: GraphQLID }
        },
        async resolve(parent, args){
            let { userId, locationId } = args
            try{
                let user = await User.findOne({ _id: userId}) 
                if(user){
                    let res = await User.updateOne({ _id: userId}, {
                        $pull: {
                            placesLived: { _id: locationId }
                        }
                    })
                    if(res.acknowledged){
                        return "Successfully updated"
                    }
                    else{
                        return "Unsuccessfully"
                    }
                }
            }
            catch(err){
                throw err
            }
        }
    }
}