var mongoose = require('mongoose');
var bcrypt   = require('bcryptjs');

var userModel = mongoose.Schema({
   email : String,
   password : String,
   stripe_recipient: String,
   stripe_payment: {
     token: String,
     type: String,
     details: mongoose.Schema.Types.Mixed
   },
   stripe_payout : {
     token: String,
     type: String,
     details: mongoose.Schema.Types.Mixed
   }
});

userModel.methods.generateHash = function(password) {
  var salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

userModel.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userModel);
