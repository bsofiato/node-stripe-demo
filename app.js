var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var lessMiddleware = require('less-middleware');
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

require('./passport')(passport); 

var signUp = require('./routes/sign-up', passport);
var login = require('./routes/login', passport);
var settings = require('./routes/settings', passport);
var dashboard = require('./routes/dashboard', passport);
var transfer = require('./routes/transfer', passport);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', login);
app.use('/signup', signUp);
app.use('/settings', settings);
app.use('/dashboard', dashboard);
app.use('/transfer', transfer);
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap

app.use(session({ secret: 'session-secret' })); 
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());

app.post('/signup', passport.authenticate('local-signup', {
  successRedirect : '/dashboard', // redirect to the secure profile section
  failureRedirect : '/signup', // redirect back to the signup page if there is an error
  failureFlash : true // allow flash messages
}));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
