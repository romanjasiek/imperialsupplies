const { JSDOM } = require('jsdom');
const { window } = new JSDOM('');
// const { window } = new JSDOM(``, { runScripts: 'outside-only' });

const $ = require('jquery')(window);

window.$ = window.jQuery = require('jquery');
