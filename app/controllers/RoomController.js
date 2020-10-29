const fs = require('fs');
const Room = require('../models/room');
const roomValidation = require('../validation/room');
const helper = require('../helpers/upload');

/** 
 * Get all the rooms with descending order
*/
const index = (req, res) => {
    Room.find().sort({ title: -1 })
    .then(result => {
        res.status(200).send(result);
    })
    .catch(err => {
        res.status(500).send(err);
    });
}

/**  
 * Get a room matching with id
*/
const show = (req, res) => {
    Room.findById(req.params.id)
    .then(response => {
        res.status(200).send(response);
    })
    .catch(err => {
        res.status(500).send(err);
    })
}

/**  
 * Get rooms matching with hotel
*/
const getRoomByHotel = (req, res) => {
    Room.find({ hotel_id: req.params.id })
    .then(response => {
        res.status(200).send(response);
    })
    .catch(err => {
        res.status(500).send(err);
    })
}

/** 
 * Store new room to database
 * validate the data
 * save into 
*/
const store = async (req, res) => {
    const { error } = roomValidation.roomSchema.validate(req.body);
    if(error) {
        return res.status(422).send(error.details[0].message);
    }
    console.log(req.body)
    try {
        if(req.files) {
            req.body.image = await helper.fileUpload(req.files, 'public/images/rooms');
        }
    } catch (err) {
        console.log(err);
    }

    try {
        let room = new Room(req.body);
        await room.save().then(response => {
            res.status(200).send(response);
        }).catch(err => {
            res.status(500).send(err);
        })
    } catch (err) {
        res.send(err);
    }
}

/** 
 * Update a room
 * validate the data
 * update db 
*/
const update = async (req, res) => {
    const { error } = roomValidation.roomSchema.validate(req.body);
    if(error) {
        return res.status(422).send(error.details[0].message);
    }

    try {
        if(req.files) {
            req.body.image = await helper.fileUpload(req.files, 'public/images/rooms');
        }
    } catch (err) {
        console.log(err);
    }

    try {
        Room.findOneAndUpdate(
            { _id: req.params.id },
            req.body
        ).then(response => {
            if(req.body.image && response.image) {
                fs.unlinkSync(response.image);
            }
            Room.findById(req.params.id).then(data => {
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
    Room.findOneAndDelete({ _id: req.params.id }).then(response => {
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
    getRoomByHotel,
    store,
    update,
    destroy
}