import React from "react";
import messageCss from "../stylesheets/message.css"

export default class Message extends React.Component{


render(){
			 if (this.props.sender=="Me:")
	 	 return (
	 	 	<div>
	 	 	<div id={messageCss.divLeft} >
			<span class="tag is-white" id={messageCss.senderLeft}>
				<strong>
					{this.props.sender} 
				</strong>
				</span>
				<div class="notification is-success" id={messageCss.contentLeft}>

					{this.props.content}
					


				</div>

			</div>
			<div id={messageCss.separater}>
					<span id={messageCss.time} >
						{this.props.time.slice(11,19)}
					</span>
				</div>
		</div>
	 	 )
	 else 
	 	return(
	  <div>
	 	  <div id={messageCss.divRight} >
			
			<div class="notification is-success" id={messageCss.contentRight}>

				{this.props.content}
				


			</div>
			<span class="icon" id={messageCss.senderRight} >
  					<i class="fa fa-user-circle" aria-hidden="true"></i>
			</span>

			</div>
			<div id={messageCss.separater}>
					<span id={messageCss.time} >
						{this.props.time.slice(11,19)}
					</span>
 						
			</div>
	</div>
	 		)
	  
	}
}