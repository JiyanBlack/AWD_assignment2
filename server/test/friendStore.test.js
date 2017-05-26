import FriendStore from "../public/components/FriendStore.js";
import dispatcher from "../public/components/dispatcher";
//dispatcher.register(FriendStore.handleActions.bind(this));

describe("component:FriendStore",()=>{

    const newFriends=[{
				friendID:"aeee",
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

				];


	it("when getAll get called ,it should return all it's friends",()=>{

	   var wrapper= FriendStore;
	   // wrapper.firends=newFriends;

		expect(wrapper.getAll()
			).toEqual(wrapper.friends);
	});

	it("it should sync friends with server when dispatched",stest(function(){
		var wrapper= FriendStore;
		const action={
			type:"syncFriends",
			data:newFriends,
		};
	   this.stub(FriendStore,"emit")  ; //check whether it emit change
	   dispatcher.dispatch(action);

		expect(wrapper.getAll()
			).toEqual(newFriends);  //shoulde able to get updated data now
		//SB.restore();
		expect(wrapper.emit.calledOnce).toEqual(true);
		expect(wrapper.emit.firstCall.args[0]).toEqual("change");

		//FriendStore.emit.restore();
	}));

		it("it should check friend On,Off line when dispatched",stest(function(){
		var wrapper= FriendStore;
		const action1={
			type:"checkFriendLogIn",
			data:"bbbb",
		};
		const action2={
			type:"checkFriendOffLine",
			data:"aeee",
		};
		const action3={
			type:"checkFriendOffLine",
			data:"444",
		};

	   this.stub(FriendStore,"emit")  ; //check whether it emit change
	   //this.stub(FriendStore,"updateOnOffline");
	   dispatcher.dispatch(action1);
	    

		function expects(wrapper,array,callEmit,emitN){
			
			expect(wrapper.friends[array[0]].friendOnline).toEqual(array[1]);
			expect(wrapper.friends[array[2]].friendOnline).toEqual(array[3]);
			if (callEmit)
			{
			expect(wrapper.emit.callCount).toEqual(emitN);
			expect(wrapper.emit.firstCall.args[0]).toEqual("change");
		   }
		   else
		   	expect(wrapper.emit.callCount).toEqual(emitN);

		  // obj.stub(FriendStore,"updateOnOffline");
		};
		const _this=this;
		expects(wrapper,[1,true,0,true],true,1,_this);

		dispatcher.dispatch(action2);
		console.log("wrapper friends",wrapper.friends);
		expects(wrapper,[1,true,0,false],true,2);
		dispatcher.dispatch(action3);
		expects(wrapper,[1,true,0,false],false,2);

		//FriendStore.emit.restore();
	}));


})
