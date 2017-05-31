import Messages from '../static/assets/js/Messages';
import MessageStore from "../static/assets/js/MessageStore.js";

describe("component:Messages",()=>{
	const defaultState={
		messages: [],
			friendName:"",
	};

	const fackMessages=[{
		sender:"Me:",
		content:"talking messages",
		time:"2016-06-09T16:40:20Z",
	},
	{
		sender:"him",
		content:"feecback messages",
		time:"2016-06-09T17:40:20Z",
	}
	];

it("on start up load current Messages from message store which is empty",stest(function(){

  this.stub(MessageStore,"getCurrentMessages").callsFake(()=>{return []});
	const wrapper = mount(<Messages />);
		//wrapper.setState(state);
		expect(wrapper.state()
			).toEqual(defaultState);
	}
	));
it("when message store updates, it will reload all messages",stest(function(){

	 const mStore=MessageStore ;
   this.stub(MessageStore,"getCurrentMessages").callsFake(()=>{return fackMessages});
	//mStore.currentMessages=fackMessages;
	mStore.emit("change");
	const wrapper = mount(<Messages />);
		expect(wrapper.state().messages
			).toEqual(fackMessages);
	}
	));


it("renders the updated messages without problem",stest(function(){

	const wrapper = mount(<Messages />);
	wrapper.setState({
		messages:fackMessages	});
  expect( wrapper.find("strong").length).toEqual(1); //only one "Me" sender

  expect( wrapper.text()).toMatch(fackMessages[0].content); //time and content match
    expect( wrapper.text()).toMatch(fackMessages[1].content);
   expect( wrapper.text()).toMatch("0:40:20");
    expect( wrapper.text()).toMatch("1:40:20");

	}));




})
