import test from 'ava';
import Window from 'window';
import React from 'react';
import ReactJSDOM from '../src';

test('ReactJSDOM is a object', t => {
	t.is(typeof ReactJSDOM, 'object');
});

test('ReactJSDOM cleans up globals', t => {
	global.window = 'foo';
	global.document = 'bar';
	ReactJSDOM.render(
		React.createElement('div', {}, 'hi')
	);
	t.is(global.window, 'foo');
	t.is(global.document, 'bar');
});

test('ReactJSDOM renders a React Component', t => {
	const elem = ReactJSDOM.render(
		React.createElement('div', {}, 'hi')
	);
	t.is(elem.nodeName, 'DIV');
	t.is(elem.textContent, 'hi');
});

test('ReactJSDOM allows window instance to be passed in', async t => {
	const window = new Window();
	const elem = ReactJSDOM.render(
		React.createElement('div', {}, 'hi'),
		window
	);
	t.is(elem, window.document.getElementById('root').children[0]);
	t.is(elem.nodeName, 'DIV');
	t.is(elem.textContent, 'hi');
});

test('Works with asynchronous components', async t => {
	const originalDocument = global.document;
	const { done, render } = ReactJSDOM.async;

	class Test extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				children: 'test'
			};
		}
		componentDidMount() {
			setTimeout(() => {
				this.setState({
					children: 'updated'
				});
			}, 500);
		}
		componentDidUpdate() {
			t.is(this.state.children, 'updated');
			done();
		}
		render() {
			return React.createElement('div', {}, this.state.children);
		}
	}

	const { element, restore } = await render(React.createElement(Test));

	t.is(element.nodeName, 'DIV');
	restore();
	t.is(global.document, originalDocument);
});
