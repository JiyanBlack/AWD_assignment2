import MessageStore from "../static/assets/js/MessageStore.js";
import dispatcher from "../static/assets/js/dispatcher";

describe("component:MessageStore",()=>{
	const fakeMessages=[{
		sender:"Me:",
		content:"talking messages",
		time:"2016-06-09T16:40:20Z",
	},
	{
		sender:"him",
		content:"feecback messages",
		time:"2016-06-09T17:40:20Z",
	}
	];
  	const unread={
  		u123:3,
		u456:4,
  	};
 	const userInfo={
 		userName: "zhangle",
 		userID:"12345"
 	};
 	        const serverMessages=[{
       	fromID:"456",
       	toID:"123",
       	content:"from one friend",
		time:"2016-06-09T17:40:20Z",
		beenRead:false,
       },
        {
        	fromID:"777",
	       	toID:"123",
	       	content:"from another friend",
			time:"2016-06-09T17:47:20Z",
			beenRead:true,
		},
		{
		fromID:"456",
       	toID:"123",
       	content:"another message from 456",
		time:"2016-06-10T17:40:20Z",
		beenRead:false,
       },
       {
       	fromID:"456",
       	toID:"123",
       	content:"still  message from 456",
		time:"2016-06-11T17:40:20Z",
		beenRead:false,
       }

       ];

it("stores userinformaiton when get dispatched",stest(function(){

	   const command={
	   	type:"storeUserInfo",
	   	data:userInfo,

	   }
	   var wrapper= MessageStore;

	   dispatcher.dispatch(command);
	   //wrapper.currentMessages=fackMessages;

		expect(wrapper.userName
			).toEqual(userInfo.userName);
		expect(wrapper.userID
			).toEqual(userInfo.userID);
	}));
it("gets unread messages when called",stest(function(){

	   var wrapper= MessageStore;
	   wrapper.unreadMessages=unread;
	   expect(MessageStore.getUnreadMessages()).toEqual(unread);
	}));
it("gets currentMessages when called",stest(function(){

	   var wrapper= MessageStore;
	   wrapper.currentMessages=fakeMessages;

		expect(wrapper.getCurrentMessages()
			).toEqual(fakeMessages);
	}));
it("creats message and stores internally and emit updates when dispatched",stest(function(){

       const messageFromCurrentFriend={
       	fromID:"456",
       	toID:"123",
       	content:"from current friend",
		time:"2016-06-09T17:40:20Z",
       };
      const messageFromOtherFriend={
       	fromID:"777",
       	toID:"123",
       	content:"from other friend",
		time:"2016-06-10T17:40:20Z",
       };
      const messageFromMe={
       	fromID:"123",
       	toID:"456",
       	content:"from myself",
		time:"2016-06-10T17:45:20Z",
       };

	   const commandCurrentF={
	   	type:"createMessage",
	   	data:messageFromCurrentFriend,
	   };
	   const commandOtherF={
	   	type:"createMessage",
	   	data:messageFromOtherFriend,
	   };
	   	const commandMe={
	   	type:"createMessage",
	   	data:messageFromMe,
	   };

	   this.stub(MessageStore,"emit");
	   var wrapper= MessageStore;
	   wrapper.userID="123";
	   wrapper.currentFriendID="456";
	   wrapper.currentMessages=[];  //initiallize 
	   wrapper.unreadMessages={"777":3}; //initiallize
	   dispatcher.dispatch(commandCurrentF);
	   expect(MessageStore.currentMessages).toEqual([{
	   		sender:"him",
	   		content:messageFromCurrentFriend.content,
	   		time:messageFromCurrentFriend.time,
	   }]);
	   expect(MessageStore.emit.callCount).toEqual(1);
	   expect(MessageStore.emit.firstCall.args[0]).toEqual("change");
	   dispatcher.dispatch(commandOtherF);
	   expect(MessageStore.unreadMessages).toEqual({"777":4}); //add one message
	   expect(MessageStore.emit.callCount).toEqual(2);
	   expect(MessageStore.emit.lastCall.args[0]).toEqual("updateMessage");
	   dispatcher.dispatch(commandMe);
	   //expect(MessageStore.unreadMessages).toEqual({"777":4}); //add one message
	   expect(MessageStore.currentMessages).toEqual([{
	   		sender:"him",
	   		content:messageFromCurrentFriend.content,
	   		time:messageFromCurrentFriend.time,
	   },{
	   	sender:"Me:",
	   	   	content:messageFromMe.content,
		time:messageFromMe.time,

	   }]);
	   expect(MessageStore.emit.callCount).toEqual(3);
	   expect(MessageStore.emit.lastCall.args[0]).toEqual("change");


	}));
it("sync messages from server when dispatched",stest(function(){


       const CommandSync={
       	type:"syncMessages",
	   	data:serverMessages,
       }
	   this.stub(MessageStore,"emit");
	   var wrapper= MessageStore;
       wrapper.currentMessages=[];  //initiallize 
	   wrapper.unreadMessages={}; //initiallize

	   dispatcher.dispatch(CommandSync);

	   expect(MessageStore.messages).toEqual(serverMessages);
 		expect(MessageStore.unreadMessages).toEqual({
 			"456":3
 		});
 		expect(MessageStore.emit.callCount).toEqual(1);
 		expect(MessageStore.emit.firstCall.args[0]).toEqual("updateMessage");
		}));

it("switchFriend and get all messages belong to that friend when dispatched",stest(function(){
	//  var callback= this.spy();

	  this.stub(MessageStore,"emit");
	   var wrapper= MessageStore;
		wrapper.currentMessages=[];
		wrapper.messages=serverMessages;
		wrapper.unreadMessages={
			"456":3
		};
		wrapper.currentFriendID=0;
		const commandSwitch={
			type:"switchFriend",
	    	data:{
	    		friendID: "456",
			friendName: "zhangle",
	    	},
			
		}
		 dispatcher.dispatch(commandSwitch);
       expect(MessageStore.emit.callCount).toEqual(3);
        expect(MessageStore.emit.firstCall.args[0]).toEqual("switchFriend");
         expect(MessageStore.emit.firstCall.args[1]).toEqual({
         	toID:"456",
			friendName:"zhangle",
			});
       	expect(MessageStore.currentMessages).toEqual([
       		{
       			sender:"him",
				content:serverMessages[0].content,
				time:serverMessages[0].time,
       		},
       		{sender:"him",
				content:serverMessages[2].content,
				time:serverMessages[2].time,

       		},
    		{sender:"him",
				content:serverMessages[3].content,
				time:serverMessages[3].time,

       		}

       		]);
     	expect(MessageStore.unreadMessages).toEqual({
     		"456":0
     	});
     	
   		  expect(MessageStore.emit.lastCall.args[0]).toEqual("change");	

		}));


});