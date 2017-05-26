import React from "react";
import Message from "./Message.js";
import MessageStore from "./MessageStore.js";
import io from "socket.io-client";
import SocketController from "./SocketController.js"


export default class Messages extends React.Component{
constructor(){
		super();

		this.state= {
			messages: MessageStore.getCurrentMessages(),
			friendName:"",
			//friendName:MessageStore.getCurrentFriendName(),
		}

	}

	componentWillMount(){
		MessageStore.on("change",()=>{
			this.setState({
			messages:	MessageStore.getCurrentMessages(),
			})
		});

	}

	render(){
		const {messages}= this.state;
		//const Mes= <Message  user="zhangle" msg="hello"/>

		if (messages==[]) return null;
		const Mes= messages.map((msg,i)=>
		{
			console.log("this mag",msg);
			return(
			<Message key={i} {...msg}/>)
		});
		return ( <div>
			{Mes}
		 </div>);

		
	
	}
}