import Message from '../static/assets/js/Message';

describe("component:Message",()=>{

	const propMe={
		content:"this is some text",
		sender: "Me:",
		time: "2016-05-18T16:35:20Z"
	}
    const propHim={
		content:"some other text",
		sender: ":him",
		time: "2016-06-09T16:40:20Z",
	}
	it("renders message sent from myself without error",()=>{
		var wrapper=shallow(<Message {...propMe}/>);

		expect(
			wrapper.length).toEqual(1);
		expect(wrapper.find("strong").text()).toEqual(propMe.sender);  //sender showing correct 
		expect(wrapper.text()).toMatch(propMe.content);  //content is showing 
		expect(wrapper.text()).toMatch("16:35:20"); //time is matching
	});
		it("renders message sent from others without error",()=>{
		var wrapper=shallow(<Message {...propHim}/>);

		expect(
			wrapper.length).toEqual(1);
		expect(wrapper.find("strong").length).toEqual(0);  //sender showing correct 
		expect(wrapper.text()).toMatch(propHim.content);  //content is showing 
		expect(wrapper.text()).toMatch("16:40:20"); //time is matching
	});


	

});
