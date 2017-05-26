var dataBaseSet = require ("./dataBaseSet");
var User = require("./dataBaseHandle.js").user;
var fs = require('fs');
var Hashes = require('jshashes');
var MD5= new Hashes.MD5;



var names = JSON.parse(fs.readFileSync('FirstName.json', 'utf8'));

dataBaseSet();
User.remove({},function(err){});
function getFriends(){

	const N=1500;

	for (var i=0;i<N;i++)
		{
			getTwo()
		}

}



function getTwo()
{

	var  F1=randFN();
	var  F2=randFN();
	if (F1!=F2)
	{
		if ( userList[F1].friends.length<=5 && userList[F2].friends.length<=5)
	  				{
	  					if (userList[F1].friends.indexOf(F2+"")<0)
	  					{userList[F1].friends.push(F2+"");
	  					userList[F2].friends.push(F1+"");
	  				}
	  				}
	  	
	}
}


function randFN(){
	return Math.floor(Math.random() * 1000); 
}


userList=[];

//console.log(obj[999]);

pass="zhanglejy123";
for (var i=0;i<1000;i++)
{ 
	user={
	userName:names[i]["first_name"],
	password:MD5.hex(names[i]["first_name"]+pass),
	userID:i+"",
	friends:[],
}
userList.push(user);
 	//var hash=MD5.hex(registerDom.username.value+registerDom.password.value);
}

getFriends();


fs.writeFile("users.txt", JSON.stringify(userList), function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});

for (var i=0;i<1000;i++)
{
	new User(
		userList[i]).save();
}


/*
fs.writeFile("users.txt", JSON.stringify(userList), function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); */
/*
new User({
	userName:"12312333",
	userID:"123123"
}).save();
*/



console.log("hello world");