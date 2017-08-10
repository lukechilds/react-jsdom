import test from 'ava';
import Window from 'window';
import React from 'react';
import ReactJSDOM from 'this';

test('ReactJSDOM is a object', t => {
	t.is(typeof ReactJSDOM, 'object');
});

test('ReactJSDOM renders a React Component', t => {
	const component = ReactJSDOM.render(
		React.createElement('div', {}, 'hi')
	);
	t.is(component.nodeName, 'DIV');
	t.is(component.textContent, 'hi');
});

test('ReactJSDOM allows window instance to be passed in', t => {
	const window = new Window();
	const component = ReactJSDOM.render(
		React.createElement('div', {}, 'hi'),
		window
	);
	t.is(component, window.document.getElementById('root').children[0]);
	t.is(component.nodeName, 'DIV');
	t.is(component.textContent, 'hi');
});
