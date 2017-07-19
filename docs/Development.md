# Development

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

## Technical Structure

Each line of NGLS should compile to a GLS command and arguments.
Blank lines are preserved.
Unknown lines are considered comments.

In order, see:
* [Commands.md](./Commands.md)
* [Tests.md](./Tests.md)
