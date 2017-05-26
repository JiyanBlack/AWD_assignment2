import React from "react";
import Messages from "./Messages.js";
import MessageStore from "./MessageStore.js";
import messageCSS from "./css/MessageWindow.css";
export default class MessageWindow extends React.Component{
	constructor(){
		super();
		this.state={
			friendName:"",
		}
		
		
	}
	componentWillMount(){
			MessageStore.on("switchFriend",(data)=>this.setState({
				friendName:data.friendName
			}));
			console.log("mystate"+this.state);

	}

	showIcon(){
		if(this.state.friendName)
			return(
				<label class="label" id={messageCSS.label}>{this.state.friendName}</label>);
	}
	render(){

		return (
			<div class="box" id={messageCSS.box}>
			  {
				this.showIcon()
			   }
			   <div id={messageCSS.messageDiv}>
				<Messages/>
			    </div>
			</div>
			);
	}
}