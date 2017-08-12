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

		return {
			element: container.children.length > 1 ? container.children : container.children[0],
			restore: () => {
				Object.keys(origGlobals).forEach(prop => {
					global[prop] = origGlobals[prop];
				});
			}
		};
	}
};

Object.defineProperty(ReactJSDOM, 'async', {
	enumerable: true,
  configurable: false,
  get: () => {
  	let resolve;
  	let element;
  	let restore;
  	return {
  		done: () => {
				resolve({
					element,
					restore
				});
			},
			render: (component, window) => new Promise((res, rej) => {
				resolve = res;
				const r = ReactJSDOM.render(component, window);
				element = r.element;
				restore = r.restore;
			});
		};
  }
});

module.exports = ReactJSDOM;
