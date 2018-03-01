const User = require('../models/user')
// User represent all users, not a particular instance,
// that's why we can search for One user in the database

exports.signup = function(req, res, next) {
  // res.send({success: true});

  const email = req.body.email;
  const password = req.body.password;

  // We need this, otherwise request without email, password can be saved
  if(!email || !password) {
    return res.status(422).send({error: 'You must provide email and password'});
  }

  // See if a user with the given email exists
  User.findOne({ email: email }, function(err, existingUser){
    if(err) { return next(err) ;}

    // If that exists, return an error
    if(existingUser) {
      return res.status(422).send({ error: 'Email is in use'});
    }

    // If user with email does not exist , create and save user record
    const user = new User({
      email: email,
      password: password
    })

    // Save the record to the database, it may take some time or error
    user.save( function(err){
      if(err) {return next(err);}

      // Respond to the request indicating the user was created
      res.json({"success": true})
      // res.json(user);  // We dont want to expose all user info, like password

    });

  });

}
