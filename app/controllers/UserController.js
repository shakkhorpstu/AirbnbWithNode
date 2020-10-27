const User = require('../models/user');
const bcrypt = require('bcryptjs');

/** 
 * Get all users
*/
const index = (req, res) => {
    User.find().sort({ createdAt: -1 })
    .then(result => {
        res.status(200).send(result);
    })
    .catch(err => {
        res.status(500).send(err);
    });
}

module.exports = {
    index
}