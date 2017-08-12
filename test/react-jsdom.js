/* eslint-disable react/prop-types, react/jsx-no-bind */

import test from 'ava';
import Window from 'window';
import React from 'react';
import ReactJSDOM from 'this';

class TestComponent extends React.Component {
	render() {
		return <div>hi</div>;
	}

	componentWillMount() {
		if (typeof this.props.componentWillMount === 'function') {
			this.props.componentWillMount();
		}
	}

	componentDidMount() {
		if (typeof this.props.componentDidMount === 'function') {
			this.props.componentDidMount();
		}
	}
}

test('ReactJSDOM is a object', t => {
	t.is(typeof ReactJSDOM, 'object');
});

test('ReactJSDOM cleans up globals', t => {
	global.window = 'foo';
	global.document = 'bar';
	ReactJSDOM.render(<TestComponent/>);
	t.is(global.window, 'foo');
	t.is(global.document, 'bar');
});

test('ReactJSDOM renders a React Component', t => {
	const elem = ReactJSDOM.render(<TestComponent/>);
	t.is(elem.nodeName, 'DIV');
	t.is(elem.textContent, 'hi');
});

test('ReactJSDOM allows window instance to be passed in', t => {
	const window = new Window();
	const elem = ReactJSDOM.render(<TestComponent/>, window);
	t.is(elem, window.document.getElementById('root').children[0]);
	t.is(elem.nodeName, 'DIV');
	t.is(elem.textContent, 'hi');
});

test('componentWillMount fires', t => {
	ReactJSDOM.render(<TestComponent componentWillMount={() => t.pass()}/>);
});

test('componentDidMount fires', t => {
	ReactJSDOM.render(<TestComponent componentDidMount={() => t.pass()}/>);
});
