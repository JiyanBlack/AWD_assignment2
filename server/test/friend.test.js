import Friend from '../static/assets/js/Friend';
import * as MessageAction from "../static/assets/js/MessageAction.js";

describe("component:Friend",()=>{


	const props={
			friendInfo:{
				friendOnline:true,
				friendName:"tester1",
				friendID:"12345",
			}
			,
			unreadMessages:3,
		}

	it("renders with out error",()=>{


		expect(
			shallow(<Friend {...props}/>).length).toEqual(1);

	});
	it("do show 4 spans" ,()=>{
		const wrapper=shallow(<Friend {...props}/>);
		expect(
			wrapper.find('span').length
			).toEqual(4);


	});
	it("should show correct friend name online status and unreadMessages",()=>{
		const wrapper=shallow(<Friend {...props}/>);
		expect(
			wrapper.text()
			).toMatch(props.friendInfo.friendName+props.friendInfo.friendOnline? "online":"offline"+props.unreadMessages);


	});
    it("simulate click events,check switchFriend will trigger",stest(function(){
	
 		this.stub(MessageAction,"switchFriend");

   		 const wrapper = mount(<Friend {...props}/>);
   		 wrapper.find("a").simulate("click");
   		// expect(Friend.prototype.switchFriend.calledOnce).toEqual(true);

		expect(MessageAction.switchFriend.calledOnce).toEqual(true);
		expect(MessageAction.switchFriend.firstCall.args[0]).toEqual({
			friendName: props.friendInfo.friendName,
			friendID: props.friendInfo.friendID ,
			clearUnread: false,

		});

		//MessageAction.switchFriend.restore();

	}));


});
