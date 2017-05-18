var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user.js');

router.get('/', function(req, res, next) {
  res.render('login', {});
});

module.exports = router;
