import React from "react";
import ReactDOM from "react-dom";
import MessageWindow from "./MessageWindow.js";
import Input from "./Input.js";
import SocketController from "./SocketController";
import Chat from "../stylesheets/chatWindow.css";
import FriendWindow from "./FriendWindow.js";
import HeaderProfile from "./jsx/HeaderProfile.jsx";

//import {Link} from "react-router";

export default class ChatWindow extends React.Component {


	render() {

		return (
			<div id={Chat.chat}>
				<HeaderProfile active={'chat'} />
				<SocketController />
				<MessageWindow />
				<FriendWindow />
				<Input />
			</div>
		);
	}
}