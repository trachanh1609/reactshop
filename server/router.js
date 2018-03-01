const Authentication = require('./controllers/authentication');

module.exports = function(app){
  // app.get('/', function(req, res, next){
  //   res.send(['hello', 'world', 'Mario']);
  // });

  app.post('/signup', Authentication.signup);
}
