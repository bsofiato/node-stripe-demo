var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
     done(null, user.email);
  });

  passport.deserializeUser(function(id, done) {
    User.findOne({email: id}, (err, user) => {
      done(err, user);
    });
  });

  passport.use('local-signup', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
  }, (req, email, password, done) => {
    process.nextTick(() => {
      User.findOne({email: email}, (err, user) => {
        if (err) {
          // Error during the execution;
          return done(err);
        } else if (user) {
          return done(null, false, req.flash('message', 'This user already exists.'));
        } else {
          let user = new User();
          user.email = email;
          user.password = user.generateHash(password);
          user.save((err) => {
            if (err) {
              throw err;
            } else {
              done(null, user);
            }
          });
        }
      });
    });
  }));
}
