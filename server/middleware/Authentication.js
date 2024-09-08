
const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    // console.log('Received Token:', token);

    if (!token) {
        return res.status(401).json({ message: 'Access denied, no token provided.' });
    }

    try {
        const decoded = jwt.verify(token, 'ayam');
        // console.log('Decoded Token:', decoded);
        req.loginInfo = { userId: decoded.id, email: decoded.email };
        // console.log('Login Info:', req.loginInfo);
        next();
    } catch (error) {
        console.error('Token Verification Error:', error);
        return res.status(400).json({ message: 'Invalid token.' });
    }
};


module.exports = authenticate;
