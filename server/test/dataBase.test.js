var database= require("../dataBaseSet");
var dataBaseHandle= require("../dataBaseHandle");
var checkUser=dataBaseHandle.checkUser;
var User = dataBaseHandle.user;
var assert= require("chai").assert;
describe("component:MessageStore",()=>{
     
     var dummyUser={
     	userName:"zhangle",
     	password:"nnnnwerwerwer",
     	userID:"2233344",
     	friends:["345","3345"],
     }


	it("should store user and retreive user without problem",function(done){
     		 var query=checkUser({userName:dummyUser.userName,
     		 password:dummyUser.password,
     		 });
     		 query.exec(function(err,user){


     		 expect(err).toEqual(null);
     		 expect(user).toEqual(null);

     		 });

     		var pp= new User(dummyUser).save();
     		//pp.resolve;
     		expect(pp instanceof require('mpromise')).toEqual(true);
     		//console.log("nof werwer");
     		pp.then(function(doc){
     			if (doc)
     			    console.log(doc);
     			else
     				console.log("not found");
     			assert.equal(doc.userName, "Guns N' Roses");
     			done();
     		})
     		//assert.equal("123","456");
     		//expect(true).toEqual(true);

	});


 });




