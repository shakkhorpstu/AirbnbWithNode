const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const bearerToken = req.header('Authorization');
    const token = bearerToken && bearerToken.split(' ')[1];
    if(!token) {
        return res.status(401).send('Unauthorized');
    }

    try {
        const verify = jwt.verify(token, process.env.JWT_SECRET);
        if(!verify) {
            return res.status(401).send('Unauthorized');
        }

        next();
    } catch(err) {
        return res.status(400).send('Unauthorized');
    }
}
module.exports = {
    verifyToken
}