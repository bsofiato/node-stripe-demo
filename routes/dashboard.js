var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user.js');

var authorization = require('./authorization')

router.get('/', authorization, (req, res, next) => {
  res.render('dashboard', { 
    authenticated: true,
    user: req.user 
  });
});

module.exports = router;
