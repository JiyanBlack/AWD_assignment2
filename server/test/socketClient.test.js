import dispatcher from "../public/components/dispatcher.js";
import {EventEmitter} from "events";
import * as MessageAction from '../public/components/MessageAction.js';
//import  socketControll from  "../public/components/SocketController.js";
var proxyquire = require('proxyquire').noCallThru();

describe("component:SocketController",()=>{
	

const dummyEmitter=new EventEmitter;

var dummyIO =function(){
	return dummyEmitter;
};

var dummyData= "some text";
var SocketControll = proxyquire('../public/components/SocketController.js', { "socket.io-client": dummyIO });
SocketControll=SocketControll.default;
 it("should call initialize and initialize when hear server request",stest(function(){
 

 		this.stub(SocketControll.prototype,"initialize");
 		var wrapper=mount(<SocketControll />);
 		dummyEmitter.emit("userInfo",dummyData);
 			expect(SocketControll.prototype.initialize.calledOnce).toEqual(true);
 			expect(SocketControll.prototype.initialize.firstCall.args[0]).toEqual(dummyData);
 	
  			
	}));

  it("should call action to check friend login when hear server request",stest(function(){
 	 var callback=this.spy();
 	 		dispatcher.register(callback);
 		//var wrapper=mount(<SocketControll />);
 		dummyEmitter.emit("checkFriendLogIn",dummyData);
 			expect(callback.calledOnce).toEqual(true);
 			expect(callback.firstCall.args[0]).toEqual({
		type:"checkFriendLogIn",
		data:dummyData,
	});
 			//expect(SocketControll.prototype.initialize.firstCall.args[0]).toEqual(dummyData);
 		
	}));


  it("should call action to check friend offline when hear server request",stest(function(){
 	 var callback=this.spy();
 	 		dispatcher.register(callback);
 		//var wrapper=mount(<SocketControll />);
 		dummyEmitter.emit("checkFriendOffLine",dummyData);
 			expect(callback.calledOnce).toEqual(true);
 			expect(callback.firstCall.args[0]).toEqual({
		type:"checkFriendOffLine",
		data:dummyData,
	});
 			//expect(SocketControll.prototype.initialize.firstCall.args[0]).toEqual(dummyData);
 		
	}));
 	it("should call action to sync messages when hear server request",stest(function(){
 	 var dummyData=[];
 	 var callback=this.spy();
 	 		dispatcher.register(callback);
 		//var wrapper=mount(<SocketControll />);
 		dummyEmitter.emit("syncMessages",dummyData);
 			expect(callback.calledOnce).toEqual(true);
 			expect(callback.firstCall.args[0]).toEqual({
		type:"syncMessages",
		data:dummyData,
	});
 		}));
   it("should call action to sync friends when hear server request",stest(function(){
 	 var dummyData=[];
 	 var callback=this.spy();
 	 		dispatcher.register(callback);
 		//var wrapper=mount(<SocketControll />);
 		dummyEmitter.emit("syncFriends",dummyData);
 			expect(callback.calledOnce).toEqual(true);
 			expect(callback.firstCall.args[0]).toEqual({
		type:"syncFriends",
		data:dummyData,
	});
 			//expect(SocketControll.prototype.initialize.firstCall.args[0]).toEqual(dummyData);
 		
	}));
      it("should emit send message request to server when dispatched",stest(function(){
 	// var dummyData=[];
 	 var callback=this.spy(dummyEmitter,"emit");
 	 	//	dispatcher.register(callback);
 		//var wrapper=mount(<SocketControll />);
 		const command={
 			type:"sendMessage",
 			data:"some test message",
 		}
 		dispatcher.dispatch(command);
 		expect(callback.calledOnce).toEqual(true);
 		expect(callback.firstCall.args[0]).toEqual("sendMessage");
 		expect(callback.firstCall.args[1]).toEqual(command.data);
 			//expect(SocketControll.prototype.initialize.firstCall.args[0]).toEqual(dummyData);
 		
	}));


});
