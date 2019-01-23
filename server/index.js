const express = require('express');

const app = express();

app.get('/rentals', function(req, res) { //handler function
  res.json({'success': true});
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, function() {
  console.log('Server running...');
});
