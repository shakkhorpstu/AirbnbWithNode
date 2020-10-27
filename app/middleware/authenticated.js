const jwt = require('jsonwebtoken');

const verify = (req, res, next) => {
    const token = req.header('auth-token');
    if(!token) {
        res.status(401).send('Unauthorized');
    }

    try {
        const verify = jwt.verify(token, process.env.JWT_SECRET);
        if(!verify) {
            return res.status(401).send('Unauthorized');
        }

        next();
    } catch(err) {
        res.status(400).send('Unauthorized');
    }
}

module.exports = {
    verify
}