# Tests

In additional to standard unit tests, each supported Budgie command corresponds to a directory of that command's name under `test/integration` containing:
* `source.nbg` containing NBudgie syntax
* `expected.bg` containing the expected compiled Budgie equivalent

These are verifified during `gulp test:integration`.

_Todo: running specific tests by name!_
