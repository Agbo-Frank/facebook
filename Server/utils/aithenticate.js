const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports.authenticate = async (req, res, next) => {
    let token = req.header('x-auth-token')
    
    if(!token || token === ''){
        res.status(400).json({err: "please a token by either logging in"})
    }
    try{
        let decodedToken = await jwt.verify(token, process.env.JWT_SECRET)
        if(decodedToken.id){
            req.user = decodedToken.id
            next()
        }
    }
    catch(err){
        res.status(400).json({ err })
    }
}