# react-jsdom

> Render React components to actual DOM nodes in Node.js

[![Build Status](https://travis-ci.org/lukechilds/react-jsdom.svg?branch=master)](https://travis-ci.org/lukechilds/react-jsdom)
[![Coverage Status](https://coveralls.io/repos/github/lukechilds/react-jsdom/badge.svg?branch=master)](https://coveralls.io/github/lukechilds/react-jsdom?branch=master)
[![npm](https://img.shields.io/npm/v/react-jsdom.svg)](https://www.npmjs.com/package/react-jsdom)

Makes testing simple React components super easy with any Node.js test framework.

## Install

```
npm install --save-dev react-jsdom
```

## Usage

```js
const React = require('react');
const ReactJSDOM = require('react-jsdom');

class Hi extends React.Component {
  render() {
    return (
      <div>
        <span>hi</span>
        <span>{this.props.person}</span>
      </div>
    );
  }

  componentDidMount() {
    console.log('I mounted!');
  }
}

const elem = ReactJSDOM.render(<Hi person="mum"/>);
// console: 'I mounted!'

elem.constructor.name
// 'HTMLDivElement'
elem.nodeName;
// 'DIV');
elem.querySelector('span:last-child').textContent;
// 'mum'
elem.outerHTML;
// <div>
//   <span>hi</span>
//   <span>mum</span>
// </div>
```

## License

MIT © Luke Childs
