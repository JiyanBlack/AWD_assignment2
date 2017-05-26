import React from "react";
import Friend from "./Friend.js";
import FriendStore from "./FriendStore.js";
import io from "socket.io-client";
import SocketController from "./SocketController.js";
import MessageStore from "./MessageStore.js";
import * as MessageAction from "./MessageAction.js";



export default class Friends extends React.Component{
constructor(){
		super();

		this.state={
			friends:FriendStore.getAll(),
			unreadMessages:MessageStore.getUnreadMessages(),
			initialUnread:MessageStore.getInitialUnread(),
		};
		//this.initialUndread={};

	}

	componentWillMount(){
		FriendStore.on("change",()=>{
			this.setState({
				friends:FriendStore.getAll(),

			});
		});

		MessageStore.on("updateMessage",()=>{
			this.setState({
				//friends:FriendStore.getAll(),
				unreadMessages:MessageStore.getUnreadMessages(),
				initialUnread:MessageStore.getInitialUnread(),
			});
			
		});

	}
	/*componentDidMount(){
        Socket().on("chat message", (msg)=> {console.log(msg)});

      }*/

	render(){

		const {friends}=this.state;
		const {unreadMessages}= this.state;

		const Friends=[];
		friends.forEach((friend)=>{
			var iniUnread= this.state.initialUnread[friend.friendID] ? this.state.initialUnread[friend.friendID]:0;
			if (friend.friendOnline)
					
				   Friends.unshift(<Friend key={friend.friendID} friendInfo={friend} unreadMessages={unreadMessages[friend.friendID]} initialUnread={iniUnread}/>);
			else
				   Friends.push(<Friend key={friend.friendID} friendInfo={friend} unreadMessages={unreadMessages[friend.friendID]} initialUnread={iniUnread}/>);
		});

		return ( <div>
			{Friends}
		 </div>);

		
	
	}
}