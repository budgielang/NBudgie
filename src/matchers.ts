/**
 * Possible string-to-args matcher for a command.
 *
 * @type TCommandArgs   Args for the command to convert into.
 */
export interface IMatcher<TCommandArgs extends {} = {}> {
    /**
     * Exec test for a potential input string.
     */
    readonly expression: RegExp;

    /**
     * Converts successful matches into command arguments.
     *
     * @param matches   Matched results from the expression.
     * @returns Equivalent arguments for the command.
     */
    parseArgs(matches: RegExpMatchArray): TCommandArgs;
}

/**
 * List of potential matchers for a command.
 *
 * @type TCommandArgs   Args for the command to convert into.
 */
export interface IMatchersList<TCommandArgs extends {} = {}> {
    /**
     * Potential matchers for a command.
     */
    readonly matchers: IMatcher<TCommandArgs>[];
}
