'use strict';

const Window = require('window');
const ReactDOM = require('react-dom');

const ReactJSDOM = {
	version: ReactDOM.version,
	render: (component, window) => {
		window = window || new Window();
		const document = window.document;

		const origGlobals = {
			window: global.window,
			document: global.document
		};
		global.window = window;
		global.document = document;

		const container = document.createElement('div');
		container.id = 'root';
		document.body.appendChild(container);

		ReactDOM.render(component, container);

		Object.keys(origGlobals).forEach(prop => {
			global[prop] = origGlobals[prop];
		});

		return [...container.childNodes];
	}

};

module.exports = ReactJSDOM;
