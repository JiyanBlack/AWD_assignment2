import FriendWindow from "../static/assets/js/FriendWindow.js";
import FriendStore from "../static/assets/js/FriendStore.js";



describe("component:FriendWindow",()=>{

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

		var wrapper= FriendStore;
		wrapper.friends=dumyFriends;

		expect(
			shallow(<FriendWindow />).length).toEqual(1);

	const newWindow = mount(<FriendWindow />);

	expect(newWindow.find("a").length ).toEqual(2);  //check 2 friends showing correctly

	}));




});