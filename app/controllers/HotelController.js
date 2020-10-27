const { required } = require("@hapi/joi");

const Hotel = require('../models/hotel');

const index = (req, res) => {
    res.send('Hotel list');
}

module.exports = {
    index
}