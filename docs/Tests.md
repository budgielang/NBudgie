# Tests

In additional to standard unit tests, each supported GLS command corresponds to a directory of that command's name under `test/integration` containing:
* `source.ngls` containing NGLS syntax
* `expected.gls` containing the expected compiled GLS equivalent

These are verifified during `gulp test:integration`.

_Todo: running specific tests by name!_
