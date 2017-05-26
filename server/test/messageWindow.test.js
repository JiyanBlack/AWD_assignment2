import MessageWindow from "../public/components/MessageWindow.js";
import MessageStore from "../public/components/MessageStore.js";



describe("component:MessageWindow",()=>{

		 const dumyFriends=[{
		 		friendID:"123",
				friendName:"zhangle",
				friendOnline:true},
				{
				friendID:"456",
				friendName:"Li4",
				friendOnline:false}
		 ];

	it("it should renders with out error",stest(function(){


		expect(
			shallow(<MessageWindow />).length).toEqual(1);

	}));

   it("it should change friend name when MessageStore emit switchfriend request",stest(function(){
   		
   		var wrapper=mount(<MessageWindow />);
   		var store =MessageStore;
   		store.emit("switchFriend",{
			toID:"666",
			friendName:"someuser",
			});
  		expect(
			wrapper.state().friendName).toEqual("someuser");
     expect(
			wrapper.find("label").text()).toEqual("someuser");

	}));




});