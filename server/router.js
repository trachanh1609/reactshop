const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false});
const requireSignin = passport.authenticate('local', {session: false} );

module.exports = function(app){
  // app.get('/', function(req, res, next){
  //   res.send(['hello', 'world', 'Mario']);
  // });

  app.post('/signup', Authentication.signup);

  // for any requuest, hit requireSignin before Authentication.signin
  app.post('/signin', requireSignin , Authentication.signin);
  // app.post('/signin', requireSignin , function(req, res){
  //   res.send({ you: 'are signed in'});
  // });


  // for any requests, run requireAuth, if passed, do callback
  app.get('/', requireAuth, function(req, res){
    res.send({ hi: 'there'});
  })
}
