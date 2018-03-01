const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false});

module.exports = function(app){
  // app.get('/', function(req, res, next){
  //   res.send(['hello', 'world', 'Mario']);
  // });

  app.post('/signup', Authentication.signup);

  // for any requests, run requireAuth, if passed, do callback
  app.get('/', requireAuth, function(req, res){
    res.send({ hi: 'there'});
  })
}
