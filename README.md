# NBudgie - Natural Budgie 🦜

[![Greenkeeper badge](https://badges.greenkeeper.io/budgielang/NBudgie.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/budgielang/NBudgie.svg?)](https://travis-ci.org/budgielang/NBudgie)
[![NPM version](https://badge.fury.io/js/nbudgie.svg)](http://badge.fury.io/js/nbudgie)

A natural language layer on top of Budgie.

[General Language Syntax (Budgie)](https://github.com/budgielang/budgie) is a unified syntax that compiles into a number of OOP languages.
NBudgie converts natural language to Budgie syntax, which can then be converted into real code.

<table>
    <thead>
        <th>NBudgie</th>
        <th>Budgie</th>
    </thead>
    <tbody>
        <tr>
            <td><code>Comment that this is an awesome project</code></td>
            <td><code>comment line : This is an awesome project</code></td>
        </tr>
        <tr>
            <td><code>Gimme a for loop for i from 0 to 10 pls</code></td>
            <td><code>for numbers start : i number 0 10</code></td>
        </tr>
        <tr>
            <td>
                <code><pre>Let's start off with a joyous class named Painting
First we'll give it a happy little private string named trees
Then we add to that with a fun private member name, also of type int
You know what, I think that's all we need. Let's end the class.</pre></code>
            </td>
            <td>
                <code><pre>class start : Painting
member variable declare : private trees string
member variable declare : private name string
class end</pre></code>
            </td>
        </tr>
    </tbody>
</table>


## Usage

```javascript
const nbudgie = require("nbudgie");

const nbudgieParser = nbudgie.createParser();

// "comment line : Hello!"
nbudgieParser.parseLines([
    `note: Hello!`
]);
```

## Development

See [docs/Development.md](./docs/Development.md).
