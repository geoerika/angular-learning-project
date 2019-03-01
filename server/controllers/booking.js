const Booking = require('../models/booking');
const Rental = require('../models/rental');
const User = require('../models/user');
const { normalizedErrors } = require('../helpers/moongose');
const moment = require('moment');

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

          if (isValidBooking(booking, foundRental)) {
            booking.user = user;
            booking.rental = foundRental;
            foundRental.bookings.push(booking);
            booking.save(function(err) {
              if (err) {
                res.status(422).send({errors: normalizedErrors(err.errors)});
              }
              foundRental.save();
              User.update(
                 { _id: user.id },
                 { $push: { bookings: booking } },
                 function(){}
              );

              return res.json({startAt: booking.startAt, endAt: booking.endAt});
            });
          } else {
            return res.status(422).send({errors: [{title: 'Invalid Booking!', detail: 'Chosen Dates are already taken!'}]});
          }
        })
}

function isValidBooking(proposedBooking, rental) {
  let isValid = true;
  if(rental.bookings && rental.bookings.length > 0) {
    isValid = rental.bookings.every(function(booking) {
      const proposedStart = moment(proposedBooking.startAt);
      const proposedEnd = moment(proposedBooking.endAt);

      const actualStart= moment(booking.startAt);
      const actualEnd= moment(booking.endAt);

      return ((actualStart < proposedStart && actualEnd < proposedStart) || (proposedEnd < actualEnd && proposedEnd < actualStart));
    });
  }
  return isValid;
}
