/**
 * Tests whether a string matches a command.
 */
export interface IMatchTest {
    /**
     * Attempts to match a string for the command.
     *
     * @param input   Input string to test.
     * @returns Found names in the string, if it matches.
     */
    execute(input: string): string[] | undefined;
}

/**
 * Possible string-to-args matcher for a command.
 *
 * @type TCommandArgs   Args for the command to convert into.
 */
export interface IMatcher<TCommandArgs extends {} = {}> {
    /**
     * Tests whether a string matches a command.
     */
    test: IMatchTest;

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
