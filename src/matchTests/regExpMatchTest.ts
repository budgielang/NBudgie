import { IMatchTest } from "../matchers";

/**
 * Tests whether a string matches a command by a regular expression.
 */
export class RegExpMatchTest implements IMatchTest {
    /**
     * @param expression   Matching regular expression for tests.
     */
    private readonly expression: RegExp;

    /**
     * Initializes a new instance of the RegExpMatchTest class.
     *
     * @param expression   Matching regular expression for tests.
     */
    public constructor(expression: RegExp) {
        this.expression = expression;
    }

    /**
     * Attempts to match a string for the command.
     *
     * @param input   Input string to test.
     * @returns Found names in the string, if it matches.
     */
    public execute(input: string): string[] | undefined {
        const match = this.expression.exec(input);
        if (match === null) { // tslint:disable-line:no-null-keyword
            return;
        }

        this.expression.lastIndex = 0;

        return match;
    }
}
