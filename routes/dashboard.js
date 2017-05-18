var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user.js');

router.get('/', function(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/');
  } else {
    res.render('dashboard', {});
  }
});

module.exports = router;
