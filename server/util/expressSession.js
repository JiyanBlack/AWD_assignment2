
var express_session=require('express-session');
var credentials= require('./credentials.js');

module.exports =function()
{
	//
	//app.set('trust proxy',1);
var opt_express={
    secret: 'some secret value',
    resave: true,
    saveUninitialized: true,
    //cookie:{secure: true}
    //store:sessionStore
};
return express_session(opt_express);


}