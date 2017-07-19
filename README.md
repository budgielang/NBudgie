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

NGLS uses [Gulp](http://gulpjs.com/) to automate building, which requires [Node.js](http://node.js.org).

To build from scratch, install Node.js and run the following commands:

```
npm install -g gulp
npm install
gulp
```

To build, run `gulp`.
You can build+lint the souce without running tests using `gulp src`, or just build+lint+run tests using `gulp test`.
The full list of tasks is in `gulpfile.js`.

Alternately, use `tsc` to build source files under `/src` to `/lib`, and `tsc -w` to build upon file changes.

### Commands

Each supported GLS command needs a `matchers.ts` exporting a `MatchersList` and a `command.ts` exporting a `Command`.

#### `MatchersList`

Each command's `MatchersList` tests whether input strings can be converted to that GLS.
If the string can, a `string[]` of matches from the `test` is converted to an object satisfying that command's `ICommandArgs`.

For each list of tests, the first matching test (if any) will be used.
Testers satisfy the `IMatchTest` interface and are typically implemented with a regular expression.

#### `Command`

A command takes in a settings object and converts it to lines of GLS and/or recursive NGLS command, as one `string[]` per line.
Recursive NGLS commands must start with `"{ "` and end with `" }"`.

### Tests

Integration tests are done using BDD.
Folders under `/test/integration` will contain a `source.txt` file with raw text source and an `expected.txt` file with the expected output.
These are verifified during `gulp test:integration`.
