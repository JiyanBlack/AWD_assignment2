 //var TestComponent= require('../public/components/TComponent.js').default;
 //var TestComponent= require('../public/components/TComponent.js');
var proxyquire = require('proxyquire').noCallThru();

describe("component:Message",()=>{
	//console.log(TestComponent);
		it("renders message sent from myself without error",stest(function(){
			//this.stub(Test.prototype,"getS");
			const dumF= function (){return "456"};
  var Test = proxyquire('../public/components/TComponent.js', { "./Function": dumF });
   		 Test=Test.default;
   		 //wrapper.find("a").simulate("click");
		var wrapper=mount(<Test />);

		//expect(wrapper.html()).toEqual("123");

	}));



	});



