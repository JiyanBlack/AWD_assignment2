var assert=chai.assert;
//require("../public/static/assets/js/smallLogin.js");

describe('test Password checking', function() {

  		var shortPass= "zh4g";
  		var longPass="zl12345678901000000000000000000000";
  		var characterPass="zhang?xx2";
      var onlyeLetters="zhangledddd";
      var onlyeNumbers="1562123123123";
      var normalPass="zhangle123";

      const passwordG=[shortPass,longPass,characterPass,onlyeLetters,onlyeNumbers,normalPass]
      const msgs=[
      "Password length should be between 8 and 20.",
      "Password can only be numbers and letters.",
      "Password need contain numbers.",
      "Password need contain letters.",
      ""
      ];

  it('should check different kind of password inputs and output error messages', function() {

     function expects(pass, msg){
     registerDom.password.value=shortPass;

     validatePassword();
     assert.equal(registerDom.passwordHint.textContent,"Password length should be between 8 and 20.");
     clearError();
     }
     expects(passwordG[0],msgs[0]);
     expects(passwordG[1],msgs[0]);
     expects(passwordG[2],msgs[1]);
     expects(passwordG[3],msgs[2]);
     expects(passwordG[4],msgs[3]);
     expects(passwordG[5],msgs[4]);

  });


});