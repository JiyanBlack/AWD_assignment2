/* dom.js */
var jsdom = require('jsdom');
const { JSDOM } = jsdom;
var exposedProperties = ['window', 'navigator', 'document'];

const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);


global.window=dom.window;
global.document=global.window.document;

global.navigator = {
  userAgent: 'node.js'
};
