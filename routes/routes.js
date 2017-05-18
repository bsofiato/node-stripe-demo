module.exports = (app, passport) => {
  var signUp = require('./sign-up', passport);
  var login = require('./login', passport);
  var settings = require('./settings', passport);
  var dashboard = require('./dashboard', passport);
  var transfer = require('./transfer', passport);
    
  app.use('/login', login);
  app.use('/signup', signUp);
  app.use('/settings', settings);
  app.use('/dashboard', dashboard);
  app.use('/transfer', transfer);

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/dashboard',
    failureRedirect : '/signup',
    failureFlash : true
  }));

  app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/dashboard',
    failureRedirect : '/login',
    failureFlash : true
  }));
}
