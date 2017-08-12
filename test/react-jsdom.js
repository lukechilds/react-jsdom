import test from 'ava';
import Window from 'window';
import React from 'react';
import ReactJSDOM from 'this';

test('ReactJSDOM is a object', t => {
	t.is(typeof ReactJSDOM, 'object');
});

test('ReactJSDOM cleans up globals', t => {
	global.window = 'foo';
	global.document = 'bar';
	ReactJSDOM.render(<div>hi</div>);
	t.is(global.window, 'foo');
	t.is(global.document, 'bar');
});

test('ReactJSDOM renders a React Component', t => {
	const elem = ReactJSDOM.render(<div>hi</div>);
	t.is(elem.nodeName, 'DIV');
	t.is(elem.textContent, 'hi');
});

test('ReactJSDOM allows window instance to be passed in', t => {
	const window = new Window();
	const elem = ReactJSDOM.render(<div>hi</div>, window);
	t.is(elem, window.document.getElementById('root').children[0]);
	t.is(elem.nodeName, 'DIV');
	t.is(elem.textContent, 'hi');
});
