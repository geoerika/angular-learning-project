const Booking = require('../models/booking');
const Rental = require('../models/rental');
const { normalizedErrors } = require('../helpers/moongose');

exports.createBooking = function(req, res) {
  const { startAt, endAt, totalPrice, guests, days, rental } = req.body;
  const user = res.locals.user;

  const booking = new Booking({ startAt, endAt, totalPrice, guests, days });

  Rental.findById(rental._id) //if we just call this we would get the rental but wothout the bookings or user
        .populate('bookings') //therefore we have to use populate to get this info
        .populate('user')
        .exec(function(err, foundRental) {
          if (err) {
            res.status(422).send({errors: normalizedErrors(err.errors)});
          }

          if (foundRental.user.id === user.id) {
            return res.status(422).send({errors: [{title: 'Invalid User!', detail: 'Cannot create Booking on your Rental!'}]});
          }

          //Check here for valid booking

          return res.json({booking, foundRental});

        })
}
