const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('./config')

function authenticateToken(req,res,next){
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        return res.status(403).json({});
    }

    try{
        const response = jwt.verify(token,JWT_SECRET)
        req.user = response.user
    }
    catch(e) {
        console.log(e)
    }

    next()
}

module.exports = { authenticateToken }
