import dispatcher from "./dispatcher";


export function sendMessage(data){

	dispatcher.dispatch({
		type:"sendMessage",
		data,
	});


}

export function syncFriends(data){

	dispatcher.dispatch({
		type:"syncFriends",
		data,
	});


}
export function refreshUnread(data){
	dispatcher.dispatch({
		type:"refreshUnread",
		data,
	});
}

/*export function handleLoggeIn(data){

	dispatcher.dispatch({
		type:"loggedIn",
		data,
	});


}*/
export function storeUserInfo(data){
	dispatcher.dispatch({
		type:"storeUserInfo",
		data,
	});
}

export function checkFriendLogIn(data){
	dispatcher.dispatch({
		type:"checkFriendLogIn",
		data,
	});
}
export function checkFriendOffLine(data){
	dispatcher.dispatch({
		type:"checkFriendOffLine",
		data,
	});
}

export function disconnected(data){
	dispatcher.dispatch({
		type:"checkFriendLogOff",
		data,
	});
}



export function login(data){

	dispatcher.dispatch({
		type:"login",
		data,
	});

}

export function addFriend(data){
	dispatcher.dispatch({
		type:"addfriend",
		data,
	});
}

export function register(data){

	dispatcher.dispatch({
		type:"register",

		data,
	});


}


export function switchFriend(data)
{
	dispatcher.dispatch({
		type:"switchFriend",
		data,
	});

}
export function storeUserID(data)
{
	dispatcher.dispatch({
		type:"storeUserID",
		data,
	});

}
 export function syncMessages(data)
{
dispatcher.dispatch({
		type:"syncMessages",
		data,
	});

}

export function createMessage(data)
{
	dispatcher.dispatch({
		type:"createMessage",
		data,
	});

}


export function deleteMessage(id){

	dispatcher.dispatch({
		type:"delete",
		id,
	});


}