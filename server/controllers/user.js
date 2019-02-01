exports.auth =function(req, res) { //handler function for routes

}

exports.register = function(req, res) {

  const { username, email, password, passwordConfirmation } = req.body;

  if (!password || !email) {
    return res.status(422).send({errors: [{title: 'Data missing!', detail: 'Provide email and password!'}]});
  }

  if (password !== passwordConfirmation) {
    return res.status(422).send({errors: [{title: 'Invalid passsword!', detail: 'Password is not the same as confirmation!'}]});
}

  res.json({username, email});
}
