const { GraphQLString, GraphQLInt, GraphQLList, GraphQLNonNull } = require('graphql')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../../../../Model/User')
const AuthType = require('../../AuthType')

module.exports = {
    createUser: {
        type: AuthType,
        args: {
            firstName: { type: new GraphQLNonNull(GraphQLString) },
            lastName: { type: new GraphQLNonNull(GraphQLString) },
            email: { type: new GraphQLNonNull(GraphQLString) },
            phoneNumber: { type: GraphQLInt },
            password: { type: new GraphQLNonNull(GraphQLString) },
            DOB: { type: GraphQLString },
            gender: { type: new GraphQLNonNull(GraphQLString) }
        },
        async resolve(parent, args){
            let { firstName, lastName, email, 
                phoneNumber, DOB, gender, password} = args

            if(DOB){
                let DOBArray = DOB.split(' ')
                DOBArray = DOBArray.map(i => parseInt(i))
            }
             
            try{
                let user = User.findOne({email})
                if(user._doc){
                    throw new Error('This User Already Exist')
                }
                let newUser = User({
                    firstName,
                    lastName,
                    email,
                    phoneNumber,
                    gender,
                    password,
                    DOB: DOBArray
                })

                //hash the password 
                let salt = await bcrypt.genSalt(10)
                let hash = await bcrypt.hash(password, salt)

                newUser.password = hash;

                newUser = await newUser.save()
                //create a json token
                let token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
                    expiresIn: 60 * 60 * 60
                })

                return {
                    token,
                    user: newUser._doc
                }

            }
            catch(err){
                throw err
            } 
        }
    }
}