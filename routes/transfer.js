var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user.js');

var authorization = require('./authorization')

router.get('/', authorization, (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.redirect('/');
  } else {
    res.render('transfer', {});
  }
});

module.exports = router;
