const Booking = require('../models/booking');

const index = (req, res) => {
    res.send('index');
}

const store = (req, res) => {
    Booking.find({ 
        room_id: req.body.room_id,
        booked_to: { $gte: req.body.booked_from }
     }).then(response => {
         if(response.length <= 0) {
            res.send('can book');
         } else {
             res.status(422).send('Not available for booking');
         }
     }).catch(err => {
         console.log(err);
         res.status(500).send(err);
     });
}

const destroy = (req, res) => {
    res.send('destroy');
}

module.exports = {
    index,
    store,
    destroy
}