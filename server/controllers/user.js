const User = require('../models/user');
const { normalizedErrors } = require('../helpers/moongose');
const jwt = require('jsonwebtoken');
const config = require('../config/dev');

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
      const token = jwt.sign({
                        userId: user.id,
                        username: user.username
                    }, config.SECRET, { expiresIn: '1h' });
      return res.json(token);

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
  }); // {email} is similar to {email: email}
}

exports.authMiddleware = function(req, res, next) {
  const token = req.headers.authorization;
  console.log('token: ', token);

  if (token) {
    const user = parseToken(token);

    User.findById(user.userId, function(err, user) {
      if (err) {
        return res.status(422).send({errors: normalizeErrors(err.errors)});
      }

      if (user) {
        res.locals.user = user;
        next();
      } else {
        return notAuthorized(res);
      }
    })
  } else {
    return notAuthorized(res);
  }
}

function parseToken(token) {
  // token looks like this "Bear lsoygibef" and it needs to be split in 2
  return jwt.verify(token.split(' ')[1], config.SECRET);
}

function notAuthorized(res) {
  return res.status(401).send({errors: [{title: 'Not authorized!', detail: 'You need to login to get access!'}]});
}
