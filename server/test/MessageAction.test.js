import { Dispatcher} from "flux";
//import proxyquire from "proxyquire";

var proxyquire = require('proxyquire').noCallThru();
//import * as MessageAction from "../components/MessageAction.js";


describe("component:MessageAction",()=>{
	//console.log("all of these are very simple questions ,ju")

	const data= {
		attr1: "some test message",
		attr2: "other test messages"
	};
			const dispatcher= new Dispatcher;

    it("it should dispach the data and registered function can get the data",stest(function(){

    		var MessageAction = proxyquire('../static/assets/js/MessageAction.js', { './dispatcher': dispatcher });
 			//console.log(MessageAction);

 			var callback=this.spy();
 			dispatcher.register(callback);
 			var count=1;
 			function expects(type,call)
 			{
 			call(data);
 			expect(callback.callCount).toEqual(count);
 			expect(callback.lastCall.args[0]).toEqual({
 				type:type,
 				data:data
 			});
 			count++;
 			}
 			expects("sendMessage",MessageAction.sendMessage);
 			expects("checkFriendLogIn",MessageAction.checkFriendLogIn);
 			expects("checkFriendOffLine",MessageAction.checkFriendOffLine);
 			expects("checkFriendLogOff",MessageAction.disconnected);
 			expects("addfriend",MessageAction.addFriend);
 			expects("register",MessageAction.register);
 			expects("switchFriend",MessageAction.switchFriend);
 			expects("storeUserID",MessageAction.storeUserID);
 			expects("syncMessages",MessageAction.syncMessages);
 			expects("createMessage",MessageAction.createMessage);
  			
	}));



});
