const util = require('util');

exports.consoleLog= function(object){

	console.log(util.inspect(object, false, null));
}