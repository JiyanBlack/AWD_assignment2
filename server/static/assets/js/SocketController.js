import React from "react";
import io from "socket.io-client";
import * as MessageAction from "./MessageAction";
import dispatcher from "./dispatcher.js";
import errorCss from '../stylesheets/error.css';
import Cookies from 'js-cookie';

export default class SocketController extends React.Component {

	constructor() {
		super();
		this.socket = io();
		this.state = {
			error: "Data base Error ,please try again Later",
			show: false,
			userid: Cookies.get('userid').toString()
		}

	}
	initialize(data) {
		MessageAction.storeUserInfo(data);
		console.log(this.state.userid);
		this.socket.emit("loadMessagefriends", this.state.userid);
	}

	handleActions(action) {
		//var dataWID=action.data;
		//dataWID.userID=this.userID;
		switch (action.type) {
			case "sendMessage":
				//this.errorLogIn("123");
				this.socket.emit("sendMessage", { data: action.data, userid: this.state.userid });
				break;

			case "switchFriend":
				if (action.data.clearUnread) {
					this.socket.emit("refreshUnread", { data: action.data.friendID, userid: this.state.userid });
					console.log("request to clear");
				}
				break;

		};

		console.log("receive an action", action);
	}

	errorHandle(errMsg) {
		this.setState({
			error: errMsg,
			show: true
		});

	}
	clearMessage() {
		this.setState({ show: false });

	}

	componentWillMount() {
		dispatcher.register(this.handleActions.bind(this));
	}
	componentDidMount() {
		console.log(this.state);
		const socket = this.socket;
		socket.emit('initing', this.state.userid);
		socket.on("userInfo", this.initialize.bind(this));
		socket.on("checkFriendLogIn", MessageAction.checkFriendLogIn.bind(this));
		socket.on("checkFriendOffLine", MessageAction.checkFriendOffLine.bind(this));
		socket.on("syncMessages", MessageAction.syncMessages.bind(this));
		socket.on("newMessage", MessageAction.createMessage.bind(this));
		socket.on("syncFriends", MessageAction.syncFriends.bind(this));
		socket.on("error", this.errorHandle.bind(this));

	}


	render() {

		return (
			<span class="tag is-danger is-large" id={this.state.show ? errorCss.error : errorCss.noShow} >
				<span>
					{this.state.error};
  			  </span>
				<button class="delete" onClick={this.clearMessage.bind(this)}></button>
			</span>

		);
	}
}
