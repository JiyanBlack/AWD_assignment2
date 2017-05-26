var assert=chai.assert;
//require("../public/static/assets/js/smallLogin.js");

describe('test UserName checking', function() {

  		var shortName= "zhag";
  		var longName="zl12345678901000000000000000000000";
  		var characterName="zhang?xx2";
  		var normalName="zhangle123";
  it('should identify and forbit user with short names', function() {


		 registerDom.username.value=shortName;

		 validateUsername();
		 assert.equal(registerDom.usernameHint.textContent,"Username length should be between 5 and 20.");
  		 clearError();
  });
   it('should identify and forbit user with too long names', function() {


		 registerDom.username.value=longName;

		 validateUsername();
		 assert.equal(registerDom.usernameHint.textContent,"Username length should be between 5 and 20.");
  		clearError();
  });
  it('should identify and forbit user input names with special characters', function() {


		 registerDom.username.value=characterName;

		 validateUsername();
		 assert.equal(registerDom.usernameHint.textContent,"Username can only be numbers and letters.");
  			clearError();
  });
   it('should now show error message for normal user names', function() {


		 registerDom.username.value=normalName;

		 validateUsername();
		 assert.equal(registerDom.usernameHint.textContent,"");
		 clearError();
  });


  // We can have more its here
});