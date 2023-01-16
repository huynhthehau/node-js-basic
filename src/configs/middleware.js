import jwt from "jsonwebtoken"

const verifyToken = (req, res, next) => {
    const token = req.header('auth-token');

    if (!token) return res.status(401).send('Access Denied');

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        next();
    } catch (err) {
        return res.status(400).send('Invalid Token');
    }
}

module.exports = { verifyToken }