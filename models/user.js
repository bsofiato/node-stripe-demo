var mongoose = require('mongoose');
var bcrypt   = require('bcryptjs');

var userModel = mongoose.Schema({
   email : String,
   password : String,
});

userModel.methods.generateHash = function(password) {
  var salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

userModel.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userModel);
