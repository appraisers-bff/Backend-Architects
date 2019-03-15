require('dotenv').config();
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'secrets are an illusion'

const restricted = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            if (err) {
                res.status(401).json({ message: 'token can not be changed' });
            } else {
                req.decodedToken = decodedToken;
                next();
            }
        })
    } else {
        res.status(401).json({ message: 'Invalid token!' });   
    }
}

module.exports = restricted;