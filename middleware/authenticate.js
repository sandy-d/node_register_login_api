const jwt = require('jsonwebtoken')

const authenticate = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, 'thesecrettoken')

        req.user = decode
        next()
    }
    catch(error) {
        if(error.namen == "TokenExpiredError") {
            res.status(401).json({
                message:"Token Expired!"
            })
        } else {
            res.json({
                message: 'Authentication Failed!'
            })
        }
        
    }
}

module.exports = authenticate