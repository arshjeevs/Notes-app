const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('./config')

function authenticateToken(req,res,next){
    const authHeader = req.headers.authorization
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY2OTkyY2ZkNGJlZjNmMGQ1ZTUwMTg3YyIsImZ1bGxOYW1lIjoiVXNlcjEiLCJlbWFpbCI6InRlc3QxQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoicGFzc3dvcmQxIiwiY3JlYXRlZE9uIjoiMjAyNC0wNy0xOFQxNDo1NTo1My44MTZaIiwiX192IjowfSwiaWF0IjoxNzIxNzk3ODg1fQ.DIl2jzwDNc3USznTDC3XjPU3n10m8IY0cdnWH8SNQho"

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
