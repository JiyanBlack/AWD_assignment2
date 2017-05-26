
import { EventEmitter} from "events";
import dispatcher from "./dispatcher.js";
import * as MessageAction from "./MessageAction";
	
 class MessageStore extends EventEmitter{
constructor(){
		super();
			this.currentFriendID=0;
			this.currentFriendName="";
		//	this.store={};
			this.messages=[];   //message store from to msg time stamp
			this.currentMessages=[];
			this.userName=""; 
			this.userID=""; 
			this.unreadMessages={
			/*	u123:3,
				u456:4,*/
			};
			this.initialUnread={

			};

	}
   getInitialUnread(){
   			return this.initialUnread;
}

	createMessage(data){
		//const user="zhangle"
		//var message={};
		//this.currentMessages.push(data);
		var ID= data.toID==this.userID ? data.fromID:data.toID;

		if(ID!=this.currentFriendID)
		{
			this.messages.push(data);
			if (this.unreadMessages[data.fromID])
					this.unreadMessages[data.fromID]+=1;
			else 
				this.unreadMessages[data.fromID]=1;
			this.emit("updateMessage");
		}
		else 
		{
			this.messages.push(data);
			var message= {
					sender:data.fromID == this.userID? "Me:":"him",
					content:data.content,
					time:data.time,
				};
			this.currentMessages.push(message);
			this.emit("change");
		}


	}
	syncMessages(data){

			this.messages=	data;
			if(this.messages)
			{
						console.log("all messages",this.messages);
						var unread=data.filter((message)=>
						!message.beenRead && message.fromID!=this.userID
							).reduce((allUnread, message) =>{ 
					var ureadID=message.fromID;
					  if ( ureadID in allUnread) {
					    allUnread[ureadID]++;
					  }
					  else {
					    allUnread[ureadID] = 1;
					  }
					  return allUnread;
					}, {}); 
						this.unreadMessages=unread;
						this.initialUnread=JSON.parse(JSON.stringify(unread));
	  }
		console.log("unread messages",unread);
		console.log("initialUnread",this.initialUnread);
		this.emit("updateMessage");
		console.log("message synct");
			}
	getUnreadMessages(){
		return this.unreadMessages;
	}
	storeUserInfo(data){
		console.log("store self",data);
		this.userName=data.userName;
		this.userID=data.userID;

	}

	switchFriend(data){
	    if(this.currentFriendID==data.friendID)
	    	return 0;
		this.currentFriendID=data.friendID;
		this.currentFriendName=data.friendName;
		this.emit("switchFriend",{
			toID:this.currentFriendID,
			friendName:this.currentFriendName,
			});
		if (data.clearUnread)
			this.initialUnread[data.friendID]=0;

		function filterF (msg){
			return (msg.fromID==this.currentFriendID || msg.toID==this.currentFriendID);
		};
		//var selectedMsgs=this.messages.filter(filterF.bind(this));
		var selectedMsgs=this.messages.filter(filterF.bind(this)).map((message)=>
			{
				return {
					sender:message.fromID == this.userID? "Me:":"him",
					content:message.content,
					time:message.time,
				}
			});
		this.currentMessages=selectedMsgs;
		if (this.unreadMessages[data.friendID]&&this.unreadMessages[data.friendID]>0)
		{   
			//console.log("initial undears",this.unreadMessages[data.friendID]&&this.unreadMessages[data.friendID]>0);
			console.log("friend ID", data.friendID);
			this.unreadMessages[data.friendID]=0;
			this.emit("updateMessage");
			//setTimeout(MessageAction.refreshUnread("123"),100);
		}

		

		this.emit("change");

	}
	getCurrentMessages(){

		return this.currentMessages;
	}
	handleActions(action)
	{
		switch(action.type)
		{
			case "createMessage" :{
				this.createMessage(action.data);
			}
			break;
			case "storeUserInfo" :{
				this.storeUserInfo(action.data);
			}
			break;
			case "switchFriend" :{
				this.switchFriend(action.data);
			}
			break;
			case "syncMessages" :{
				consoleLog(action.data);
				this.syncMessages(action.data);
			}
			break;
	

		}
		//console.log("receive an action",action);
	}
}

const messageStore = new MessageStore;
dispatcher.register(messageStore.handleActions.bind(messageStore));
//window.dispatcher= dispatcher;
export default messageStore