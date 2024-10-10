// middleware.js
const jwt = require('jsonwebtoken');
const secretKey = 'YourSecretKey';
const withAuth = function (req, res, next) {
    const authorizationHeader = req.headers['authorization'];

    if (!authorizationHeader) {
        console.log("No Token in Authorization Header");
        res.status(401).send('Unauthorized: No token provided in Authorization Header');
    } else {
        const token = authorizationHeader.split(' ')[1]; // Assuming "Bearer <token>"
        if (!token) {
            console.log("Invalid Authorization Header Format");
            res.status(401).send('Unauthorized: Invalid Authorization Header Format');
        } else {
            jwt.verify(token, secretKey, function (err, decoded) {
                if (err) {
                    console.log("Unauthorized: Invalid token");
                    res.status(401).send('Unauthorized: Invalid token');
                } else {
                    req.email = decoded.email; // Adjust this based on your JWT payload
                    next();
                }
            });
        }
    }
};
module.exports = withAuth;