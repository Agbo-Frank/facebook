const { GraphQLString, GraphQLNonNull, GraphQLID } = require("graphql");
const AuthType = require("../../AuthType");
const User = require('../../../../Model/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const UserType = require("../../UserType");
const Friend = require('../../../../Model/Friend')
require('dotenv').config()

module.exports = {
    loginUser: {
        type : AuthType,
        args: {
            email: { type: new GraphQLNonNull(GraphQLString)},
            password: { type: new GraphQLNonNull(GraphQLString) }
        },
        async resolve(parent, args){
            const { email, password } = args
            try{
                let user = await User.findOne({ email })

                if(!user){
                    throw new Error("This user Does not exist")
                }

                let match = await bcrypt.compare(password, user._doc.password)
                if(!match){
                    throw new Error("incorrect password")
                }

                //create a token
                let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                    expiresIn: 60 * 60 * 60
                })
                return {
                    token,
                    user: user._doc
                }
            }
            catch(err){
                throw err
            }
        }
    },
    getUser: {
        type: UserType,
        args: { id: { type: GraphQLID }},
        resolve(parent, args){
            return User.findOne({ _id: args.id }) 
        }
    }
}