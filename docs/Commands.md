# Commands

Each supported GLS command corresponds to a directory of that command's name under `src/commands` containing:
* `matchers.ts` exporting a `MatchersList`
* `command.ts` exporting a `Command`
* `index.ts` exporting a method that creates an object with the corresponding `command` and `matchersList`

## `MatchersList`

Each command's `MatchersList` contains a `matchers` list tests whether an input string can be converted to the command.
If the string can, a `string[]` of matches from the `test` is converted to an object satisfying that command's `ICommandArgs`.

Matchers are typically implemented with a `RegExpMatchTest`, which takes in a matching regular expression and any number of additional restrictions.

## `Command`

A command takes in a settings object and converts it to lines of GLS and/or recursive NGLS command, as one `string[]` per line.
Recursive NGLS commands must start with `"{ "` and end with `" }"`.

## Conversions

A NGLS-to-GLS conversion is performed on a series of lines in order.

A "command context" stack is kept during each conversion as a record of which GLS commands the lines are in scope of.
For example, if an NGLS command results in an `if start` command, `"if start"` is added to the context.
It will remain there until an `if end` command removes it from the stack.

The conversion stack is necessary for parsing commands that may only exist as children in specific scopes.
`if end` may only be an immediate child of `if start`; `this` may only be an immediate or deep child of `class start`.
