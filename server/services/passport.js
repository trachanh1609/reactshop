const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt ;
const LocalStrategy = require('passport-local');

// Create local strategy
const localOptions = {usernameField: 'email'};
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
  // Verify this username(email) and password, call done with the user if it is correct username and password
  // otherwise, call done with false
  User.findOne({email: email}, function(err, user){
    if(err) { return done(err);}
    if(!user) { return done(null, false); }

    // compare passwords, is password == user.password
    user.comparePassword(password, function(err, isMatch){
      if(err) { return done(err);}
      if(!isMatch) { return done(null, false); }

      return done(null, user);
    });
  });
});

// Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};


// Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
  // See if the user ID in the payload exists in our database
  //  If it does, call 'done' with that
  // otherwise, call done without a user object
  User.findById(payload.sub, function(err, user){
    if(err) { return done(err, false); } // The process of finding user has error

    if(user){
      done(null, user);  // tell passport who the user is. Can be accessed by req.user in exports.signin
    } else {
      done(null, false); // The process of finding user is done, but we did not find the user
    }
  })
})

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
