
import { EventEmitter} from "events";
import dispatcher from "./dispatcher.js";
import {consolelog} from "./ConsoleLog.js";

 class FriendStore extends EventEmitter{
constructor(){
		super();

			this.friends=[];

	}


	addFriend(name,id){
		//const user="zhangle"
		this.friends.friends.push({
			name,
			online:"online",
			id,

		});

		this.emit("change");

	}

	getAll(){

		return this.friends;
	}

	updateOnOffline(id)
	{  
		console.log("id",id);
		console.log(this.friends);
		var friend= this.friends.find(function(f){return f.friendID==id});
		if (friend)
			{
			friend.friendOnline=!friend.friendOnline;
			this.emit("change");
		}
		//	console.log("not a friend");
	}

	/*updateFriend(data){
			this.friends.
	}*/
	syncFriends (data){

		var newFriends={};
		this.friends=data;
		
		console.log("received friend",data);

		this.emit("change");

    }    





	handleActions(action)
	{
		switch(action.type)
		{
			case "createfriend" :{
				this.addFriend(action.data);
			}
			break;

			case "checkFriendLogIn":{
					this.updateOnOffline(action.data);
					//console.log("id",id);
			}
			break;
			case "checkFriendOffLine":{
					this.updateOnOffline(action.data);
			}
			break;

			case "syncFriends" :{
				this.syncFriends(action.data);
			}
			break;


		}
		//console.log("added friend :",action);
	}
}

const friendStore = new FriendStore;
dispatcher.register(friendStore.handleActions.bind(friendStore));
//window.dispatcher= dispatcher;
export default friendStore