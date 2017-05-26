import React from "react";
import * as MessageAction from "./MessageAction.js";
import style from '../stylesheets/friend.css';

export default class Message extends React.Component{
 constructor(props){
 	super(props),
 	console.log( this.props.friendInfo.friendName,this.props.initialUnread);
 }
 switchFriend(){
 		//console.log("the initialUnread",this.props.initialUnread);
 		var clearUnread = this.props.initialUnread>0 ? true:false;

 		MessageAction.switchFriend(
 			{
 				friendName:this.props.friendInfo.friendName,
 				friendID:this.props.friendInfo.friendID,
 				clearUnread:clearUnread,
 			});
 }
 /*
 componentWillReceiveProps(nextProps) {
  //var undread = this.props.unreadMessages ? this.props.unreadMessages:0;
     var nextUnread = nextProps.unreadMessages ? nextProps.unreadMessages:0;
  console.log("initial undread",this.initialUnread);
  if (this.initialUnread > nextUnread) {
      MessageAction.refreshUnread({friendID:this.props.friendInfo.friendID});
  }
}*/


showUnreadMessage(){
	console.log("messages",this.props.unreadMessages);
	const  unreads=this.props.unreadMessages;
		if(unreads)
			return (<span class="tag" id={style.undread}>{unreads}</span>)
	else 
		 return ""
	
}

render(){ 

         		var iconID=style.iconOffline;
       	    	var nameID=style.userNameOffline;

       	   console.log(this.props.friendInfo.friendOnline);
       if(this.props.friendInfo.friendOnline)
       	    {
       	    	//console.log("should user this value")
              	  iconID=style.iconOnline;
       	    	nameID=style.userNameOnline;

       	    }

		return ( 
				//console.log()
			<a class="button" id={style.friend} onClick={this.switchFriend.bind(this)}>
				<div id={style.div}>
					<span class="icon" id={iconID} >
  					<i class="fa fa-user-circle" aria-hidden="true"></i>
				</span>
				<span  id={nameID}>
			 	  <strong> 
					{this.props.friendInfo.friendName}
				  </strong> 
				</span>
				<span class="tag is-white" id={style.online}>
				 	{ this.props.friendInfo.friendOnline ? "online":"offline"}
				</span>
				   {this.showUnreadMessage()}
					
				</div>

			 </a>

			);

		
	
	}
}