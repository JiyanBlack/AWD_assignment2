import React from "react";
import Friends from "./Friends.js"
import fw from "../stylesheets/friendWindow.css";
export default class MessageWindow extends React.Component{
	constructor(){
		super()
		
		
	}
	render(){
		return (
			<div class="box"  id={fw.box}>
				<Friends/>
			</div>
			);
	}
}