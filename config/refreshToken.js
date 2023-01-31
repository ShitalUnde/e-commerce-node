const jwt = require('jsonwebtoken')
const generateRefreshToken = (id)=> {
    return jwt.sign({id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn:"3d"})
}

module.exports = {generateRefreshToken}