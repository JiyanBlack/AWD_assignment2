import Friends from '../static/assets/js/Friends';
import MessageStore from "../static/assets/js/MessageStore.js";
import FriendStore from "../static/assets/js/FriendStore.js";

describe("component:Friends",()=>{


	const state={
			friends:[{
				friendID:"aaaa",
				friendName:"zhangle",
				friendOnline:true},
				{
				friendID:"bbbb",
				friendName:"Li4",
				friendOnline:false},
			{
				friendID:"cccc",
				friendName:"user3",
				friendOnline:false}

				]
			,
			unreadMessages:{
				aaaa:3,
				bbbb:4,
				cccc:5,
			},
			initialUnread:{
			    aaaa:1,
				bbbb:2,
				cccc:3,
			}
		};

		const changedState={
			friends:[{
				friendID:"cccc",
				friendName:"zhangle",
				friendOnline:true},
				{
				friendID:"dddd",
				friendName:"Li4",
				friendOnline:false}

				]
			,
			unreadMessages:{
				dddd:3,
				cccc:3,
			},
		};


	it("on start up will load friends and messages from friend store and message store and update it's state",stest(function(){

	this.stub(FriendStore,"getAll").callsFake(function(){return state.friends});
	this.stub(MessageStore,"getUnreadMessages").callsFake(function(){return state.unreadMessages});
    this.stub(MessageStore,"getInitialUnread").callsFake(function(){return state.initialUnread});

	const wrapper = mount(<Friends />);
		//wrapper.setState(state);

		expect(wrapper.state()
			).toEqual(state);
	}
	));

	it("should render the information stored in it's state(3 friends) and first one should be online",stest(function(){
  	this.stub(FriendStore,"getAll").callsFake(function(){return state.friends});
  	this.stub(MessageStore,"getUnreadMessages").callsFake(function(){return state.unreadMessages});
   	   const wrapper = mount(<Friends />);
		expect(wrapper.find("a").length
			).toEqual(3);     // check 3 friends out rendered
	    expect(wrapper.find("a").first().text()).toMatch(state.friends[0].friendName+state.friends[0].friendOnline?"online":"offline"+state.unreadMessages["aaaa"]);
	})
	);


	it("should change with friend store 'change' request",stest(function(){;
   	   const wrapper = mount(<Friends />);
   	   this.stub(FriendStore,"getAll").callsFake(function(){return changedState.friends});
   	   FriendStore.emit("change");   //simulate "change" event
	   expect(wrapper.find("a").length
			).toEqual(2);     // check 2 friends out rendered

	   expect(wrapper.state().friends).toEqual(changedState.friends);
	  

	}));

	it("should change with Messate store 'change' request",stest(function(){;
   	   const wrapper = mount(<Friends />);
   
   	  this.stub(MessageStore,"getUnreadMessages").callsFake(function(){return changedState.unreadMessages});
   	   MessageStore.emit("updateMessage");   //simulate "change" event
   		 

	   expect(wrapper.state().unreadMessages).toEqual(changedState.unreadMessages);




	}));




})


