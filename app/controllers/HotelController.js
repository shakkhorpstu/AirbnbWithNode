const Hotel = require('../models/hotel');
const hotelValidation = require('../validation/hotel');

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
 * Store a new hotel to database
 * validate the data
 * save into 
*/
const store = async (req, res) => {
    const { error } = hotelValidation.hotelSchema.validate(req.body);
    if(error) {
        return res.status(422).send(error.details[0].message);
    }

    let data = req.body;

    let image = await uploadFile(req.files);
    
    console.log('outside')
    let hotel = new Hotel(data);
    hotel.save().then(response => {
        res.status(200).send(response);
    })
    .catch(err => {
        res.status(500).send(err);
    })
}

const update = (req, res) => {
    res.send('update');
}

const destroy = (req, res) => {
    res.send('destroy');
}

const uploadFile = async (files) => {
    let image = '';
    if (files || Object.keys(files).length >= 0) {
        let sampleFile = files.file;
        sampleFile.mv('public/images/hotels/filename.jpg', function(err) {
            if (err) {
                return res.status(500).send(err);
            }
            else {
                image = 'filename';
                console.log('image')
            }
        });
    }
    return image;
}

module.exports = {
    index,
    show,
    store,
    update,
    destroy
}