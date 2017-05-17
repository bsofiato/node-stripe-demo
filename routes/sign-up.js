var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('sign-up', {});
});

module.exports = router;
