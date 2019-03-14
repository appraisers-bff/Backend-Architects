require('dotenv').config();
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'Super secret is here'


const auth = (req, res, next) => {
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
        res.status(401).json({ error: 'No token found' });
    }
}

module.exports = auth;