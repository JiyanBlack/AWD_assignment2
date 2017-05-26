import React from "react";
import expect from 'expect';
import sinon from 'sinon';
import { stub, spy,sandbox,test} from 'sinon';
import { mount, render, shallow } from 'enzyme';
import sinonTest from 'sinon-test';

sinon.test = sinonTest.configureTest(sinon);
sinon.testCase = sinonTest.configureTestCase(sinon);

global.expect = expect;
//global.sinon = sinon;
global.spy = spy;
global.stub=stub;
global.React=React;
global.mount = mount;
global.render = render;
global.shallow = shallow;
global.sinon=sinon;
global.stest=sinon.test;