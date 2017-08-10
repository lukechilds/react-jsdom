import test from 'ava';
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
