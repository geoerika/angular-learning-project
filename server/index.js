const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/dev');
const Rental = require('./models/rental');

mongoose.connect(config.DB_URI, { useNewUrlParser: true });

const app = express();

app.get('/rentals', function(req, res) { //handler function
  res.json({'success': true});
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, function() {
  console.log('Server running...');
});
