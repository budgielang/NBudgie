# NGLS - Natural General Language Syntax

[![Build Status](https://travis-ci.org/HighSchoolHacking/NGLS.svg?)](https://travis-ci.org/HighSchoolHacking/NGLS)
[![NPM version](https://badge.fury.io/js/ngls.svg)](http://badge.fury.io/js/ngls)

A natural language layer on top of GLS.

[General Language Syntax (GLS)](https://github.com/highschoolhacking/gls) is a unified syntax that compiles into a number of OOP languages.
NGLS converts natural language to GLS syntax, which can then be converted into real code.

<table>
    <thead>
        <th>NGLS</th>
        <th>GLS</th>
        <th>JavaScript</th>
    </thead>
    <tbody>
        <tr>
            <td><code>Comment that this is an awesome project</code></td>
            <td><code>comment line : This is an awesome project</code></td>
            <td><code>// This is an awesome project</code></td>
        </tr>
        <tr>
            <td><code>Gimme a for loop for i from 0 to 10 pls</code></td>
            <td><code>for numbers start : i number 0 10</code></td>
            <td><code>for (let i = 0; i < 10; i++) {</code></td>
        </tr>
        <tr>
            <td><code>How about an int named count equal to 7</code></td>
            <td><code>variable : count int 7</code></td>
            <td><code>let count = 7;</code></td>
        </tr>
    </tbody>
</table>


## Usage

```javascript
const ngls = require("ngls");

const nglsParser = ngls.createParser();

// "comment line : Hello!"
nglsParser.parseLines([
    `note: Hello!`
]);
```

## Development

See [docs/Development.md](./docs/Development.md).
