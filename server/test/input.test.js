import Input from "../static/assets/js/Input.js";
import * as MessageAction from "../static/assets/js/MessageAction";
import MessageStore from "../static/assets/js/MessageStore.js";

describe("component:Input",()=>{


	it("renders correctly without problem",()=>{

	   var wrapper= mount(<Input/>);

		expect(wrapper.find("input").length
			).toEqual(1);
		expect(wrapper.find("a").length
			).toEqual(1);
		expect(wrapper.find("a").text()
			).toMatch("Send");

	});

	it("it will call handleClick function when 'send' button is clicked ",stest(function(){

	   
 	   this.stub(Input.prototype,"handleClick");
	   var wrapper= mount(<Input/>);
	   
	  // wrapper.simulate('keyDown', {keyCode: 13}); //simulate enter
	  wrapper.find("a").simulate("click");
		expect(Input.prototype.handleClick.calledOnce  
			).toEqual(true);               //when no content don't send

	}));

	it("it will call handleKeyPress function with 'enter' key presssed ",stest(function(){

	   
 	   this.stub(Input.prototype,"handleKeyPress");
	   var wrapper= mount(<Input/>);

	   wrapper.find("input").simulate('keypress', {key: 'Enter'}); //simulate enter
		expect(Input.prototype.handleKeyPress.callCount
			).toEqual(1);

	}));

	it("it will call sendMessage function of MessageAction when handleClick is trigerred ",stest(function(){

 		const someState={
 			content:"some Message",
 			toID:"someID",
 		}
	   
 	   this.stub(MessageAction,"sendMessage");
	   var wrapper= mount(<Input/>);

	   wrapper.find("a").simulate("click");

	  // wrapper.find("input").simulate('keypress', {key: 'Enter'}); //simulate enter
		expect(MessageAction.sendMessage.callCount     //when no id or no content than don't send
			).toEqual(0);

		wrapper.setState({content:someState.content});
		wrapper.find("a").simulate("click");
		expect(MessageAction.sendMessage.callCount     //when no id than don't send
			).toEqual(0);

	   wrapper.setState(someState);
	   wrapper.find("a").simulate("click");
		expect(MessageAction.sendMessage.callCount    
			).toEqual(1);
		expect(MessageAction.sendMessage.firstCall.args[0]
			).toEqual(someState);
		expect(wrapper.state().content).toEqual(false); // the content then becomes empty

	}));


it("it should keep input changes and store input into state",stest(function(){
     var wrapper= mount(<Input/>);

     wrapper.find("input").simulate('change', { target: { value: 'Hello' } });

     expect(wrapper.state().content).toEqual("Hello");


 }));



it("when switch user command is emitted from MessageStore, it will update it's toID",stest(function(){
     const msg={toID:"testSomeID"};
     var wrapper= mount(<Input/>);

     MessageStore.emit("switchFriend",msg);

   //  wrapper.find("input").simulate('change', { target: { value: 'Hello' } });

     expect(wrapper.state().toID).toEqual(msg.toID);


 }));

});