const util = require('util');

module.exports= function(object){
	console.log(util.inspect(object, false, null));};