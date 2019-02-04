const User = require('../models/user');
const { normalizedErrors } = require('../helpers/moongose');

exports.auth =function(req, res) { //handler function for routes

  const { email, password } = req.body;

  if (!password || !email) {
    return res.status(422).send({errors: [{title: 'Data missing!', detail: 'Provide email and password!'}]});
  }

  User.findOne({email}, function(err, user) {
    if (err) {
      res.status(422).send({errors: normalizedErrors(err.errors)});
    }

    if (!user) {
      return res.status(422).send({errors: [{title: 'Invalid user!', detail: "Wrong email or password!"}]});
    }

    if (user.hasSamePassword(password)) {
      //return JWT

    } else {
      return res.status(422).send({errors: [{title: 'Wrong Data!', detail: "User doesn't exist!"}]});
    }
  });

}

exports.register = function(req, res) {

  const { username, email, password, passwordConfirmation } = req.body;

  if (!password || !email) {
    return res.status(422).send({errors: [{title: 'Data missing!', detail: 'Provide email and password!'}]});
  }

  if (password !== passwordConfirmation) {
    return res.status(422).send({errors: [{title: 'Invalid passsword!', detail: 'Password is not the same as confirmation!'}]});
  }

  User.findOne({email}, function(err, existingUser) {
    if (err) {
      res.status(422).send({errors: normalizedErrors(err.errors)});
    }

    if (existingUser) {
      res.status(422).send({errors: [{title: 'Invalid email!', detail: 'User with this email already exists!'}]});
    }

    const user = new User({
      username,
      email,
      password
    });

    user.save(function(err) {
      if (err) { //we handle here errors from mongoose
        return res.status(422).send({errors: normalizedErrors(err.errors)});
      }

        return res.json({'registered': true});
    });
  }); //similar to {email: email}

}
