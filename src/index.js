'use strict';

const Window = require('window');
const ReactDOM = require('react-dom');

const ReactJSDOM = {
	version: ReactDOM.version,
	render: component => {
		const window = new Window();
		const document = window.document;

		const origGlobals = {
			window: global.window,
			document: global.document
		};
		global.window = window;
		global.document = document;

		const container = document.createElement('div');
		ReactDOM.render(component, container);

		Object.keys(origGlobals).forEach(prop => {
			global[prop] = origGlobals[prop];
		});

		return container.children.length > 1 ? container.children : container.children[0];
	}

};

module.exports = ReactJSDOM;
