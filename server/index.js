const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/dev');
const FakeDb = require('./fake-db');
const Rental = require('./models/rental');
const path = require('path');
const cors = require('cors');

const rentalRoutes = require('./routes/rentals'),
      userRoutes = require('./routes/users'),
      bookingRoutes = require('./routes/bookings');

mongoose.set('useCreateIndex', true);

mongoose.connect(config.DB_URI, { useNewUrlParser: true }).then(() => {
  console.log('I am connected to database')
  const fakeDb = new FakeDb();
  fakeDb.seedDb();
});


const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());


app.use('/api/v1/rentals', rentalRoutes); ///api/v1/rentals is middleware; we will use rentalRoutes when we go to this path
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/bookings', bookingRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT , function() {
  console.log('App is running!');
});
