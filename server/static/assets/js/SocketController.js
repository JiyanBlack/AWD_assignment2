import React from "react";
import io from "socket.io-client";
import * as MessageAction from "./MessageAction";
import dispatcher from "./dispatcher.js";
import errorCss from '../stylesheets/error.css';

export default class SocketController extends React.Component {

	constructor() {
		super();
		this.socket = io('http://localhost:3000/');
		this.state = {
			error: "Data base Error ,please try again Later",
			show: false,
		}

	}
	initialize(data) {
		MessageAction.storeUserInfo(data);
		this.socket.emit("loadMessagefriends");
	}

	handleActions(action) {
		//var dataWID=action.data;
		//dataWID.userID=this.userID;
		switch (action.type) {
			case "sendMessage":
				//this.errorLogIn("123");
				this.socket.emit("sendMessage", action.data);

				break;

			case "switchFriend":
				if (action.data.clearUnread) {
					this.socket.emit("refreshUnread", action.data.friendID);
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
		const socket = this.socket;
		socket.on("connect", () => { socket.emit('login') });
		socket.on("userInfo", this.initialize.bind(this));
		socket.on("checkFriendLogIn", MessageAction.checkFriendLogIn);
		socket.on("checkFriendOffLine", MessageAction.checkFriendOffLine);

		socket.on("syncMessages", MessageAction.syncMessages);
		socket.on("newMessage", MessageAction.createMessage);

		socket.on("syncFriends", MessageAction.syncFriends);

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
