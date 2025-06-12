const jwt = require('jsonwebtoken');

const JWT_ADMIN_SECRET = process.env.JWT_ADMIN_SECRET;

function Adminauth(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({message: 'No token provided'});
    }
    jwt.verify(token, JWT_ADMIN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({message: 'Failed to authenticate token'});
        }
        req.user = decoded;
        next();
    });
}
module.exports =  Adminauth ;