import React from "react";
import * as MessageAction from "./MessageAction";
import MessageStore from "./MessageStore.js";
import style from "../stylesheets/input.css";

//import 'bulma/css/bulma.css';
export default class Input extends React.Component{
	constructor(){
		super()
		this.state={
			content:"",
			//fromID:"",
			toID:"",
		}
	}
	handleChange(ev){
		this.setState({
			content: ev.target.value,
		})
	}
	handleClick(){
		if (this.state.toID&& this.state.content)
			MessageAction.sendMessage(this.state);
		this.setState({content:""});
		}
	handleKeyPress(e){
		 //console.log(e.key);
		 if (e.charCode === 13 && this.state.content) {
      		console.log('do validate');
      		this.handleClick();
   		 }
	}
	componentWillMount(){
		MessageStore.on("switchFriend",(msg)=>{
				this.setState(
						{
							//fromID:msg.fromID,
							toID:msg.toID,
						}
					)

		});
	}

	render(){
		return (
			<div class="block" id={style.div}>
				<input class="input is-primary" id={style.input} type="text" onKeyPress={this.handleKeyPress.bind(this)} onChange={this.handleChange.bind(this)} value={this.state.content} placeholder="text"/>
 				
 				<a class="button is-success is-focused" id={style.button} onClick={this.handleClick.bind(this)}>Send</a>
 			</div>
			);
	}
}