import { IContextTracker } from "../contextTracker";
import { IMatchRequirement, IMatchTest } from "../matchers";

/**
 * Tests whether a string matches a command by a regular expression.
 */
export class RegExpMatchTest implements IMatchTest {
    /**
     * @param expression   Matching regular expression for tests.
     */
    private readonly expression: RegExp;

    /**
     * Requirements for the match test to be executed.
     */
    private readonly requirements: IMatchRequirement[];

    /**
     * Initializes a new instance of the RegExpMatchTest class.
     *
     * @param expression   Matching regular expression for tests.
     */
    public constructor(expression: RegExp, ...requirements: IMatchRequirement[]) {
        this.expression = expression;
        this.requirements = requirements;
    }

    /**
     * Attempts to match a string for the command.
     *
     * @param input   Input string to test.
     * @param contextTracker   Tracks a command context stack.
     * @returns Found names in the string, if it matches.
     */
    public execute(input: string, contextTracker: IContextTracker): string[] | undefined {
        for (const requirement of this.requirements) {
            if (!requirement.test(input, contextTracker)) {
                return undefined;
            }
        }

        const match = this.expression.exec(input);
        this.expression.lastIndex = 0;

        return match === null // tslint:disable-line:no-null-keyword
            ? undefined
            : match;
    }
}
