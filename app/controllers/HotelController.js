const fs = require('fs');
const Hotel = require('../models/hotel');
const hotelValidation = require('../validation/hotel');
const helper = require('../helpers/upload');

/** 
 * Get all the hotels with descending order
*/
const index = (req, res) => {
    Hotel.find().sort({ title: -1 })
    .then(result => {
        res.status(200).send(result);
    })
    .catch(err => {
        res.status(500).send(err);
    });
}

/**  
 * Get a hotel matching with id
*/
const show = (req, res) => {
    Hotel.findById(req.params.id)
    .then(response => {
        res.status(200).send(response);
    })
    .catch(err => {
        res.status(500).send(err);
    })
}

/** 
 * Store new hotel to database
 * validate the data
 * save into 
*/
const store = async (req, res) => {
    const { error } = hotelValidation.hotelSchema.validate(req.body);
    if(error) {
        return res.status(422).send(error.details[0].message);
    }

    try {
        req.body.image = await helper.fileUpload(req.files, 'public/images/hotels');
    } catch (err) {
        console.log(err);
    }

    try {
        let hotel = new Hotel(req.body);
        await hotel.save().then(response => {
            res.status(200).send(response);
        }).catch(err => {
            res.status(500).send(err);
        })
    } catch (err) {
        res.send(err);
    }
}

/** 
 * Update a hotel
 * validate the data
 * update db 
*/
const update = async (req, res) => {
    const { error } = hotelValidation.hotelSchema.validate(req.body);
    if(error) {
        return res.status(422).send(error.details[0].message);
    }

    try {
        if(req.files) {
            req.body.image = await helper.fileUpload(req.files, 'public/images/hotels');
        }
    } catch (err) {
        console.log(err);
    }

    try {
        Hotel.findOneAndUpdate(
            { _id: req.params.id },
            req.body
        ).then(response => {
            if(req.body.image && response.image) {
                fs.unlinkSync(response.image);
            }
            Hotel.findById(req.params.id).then(data => {
                res.status(200).send(data);
            });
        }).catch(err => {
            res.status(500).send(err);
        });
    } catch (err) {
        res.send(err);
    }
}

/** 
 * Delete the data
*/
const destroy = (req, res) => {
    Hotel.findOneAndDelete({ _id: req.params.id }).then(response => {
        if(response.image) {
            fs.unlinkSync(response.image);
        }
        res.status(200).send(response);
    })
    .catch(err => {
        res.status(500).send(err);
    });
}

module.exports = {
    index,
    show,
    store,
    update,
    destroy
}