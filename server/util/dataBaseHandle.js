var mongoose = require('mongoose');
var User = mongoose.model('User');

exports.checkUser = function (userinfo) {
  // console.log(userinfo);
  var query = User.findOne(userinfo);
  return query
}



