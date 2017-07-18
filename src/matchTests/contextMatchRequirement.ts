import { IContextTracker } from "../contextTracker";
import { IMatchRequirement } from "../matchers";

/**
 * How a command's location within a context may allow a match.
 */
export enum ContextMatchDepth {
    /**
     * The command may be anywhere in the context.
     */
    Any,

    /**
     * The command may be anywhere in the context except the top location.
     */
    OnlyDeep,

    /**
     * The command must be in the top location.
     */
    OnlyShallow,
}

/**
 * Match restrictions based on prior command existence in the context.
 */
export class ContextMatchRequirement implements IMatchRequirement {
    /**
     * Command that needs to be in the stack.
     */
    private readonly command: string;

    /**
     * How the command's location within a context may allow a match.
     */
    private readonly depth: ContextMatchDepth;

    /**
     * Initializes a new instance of the ContextMatchRequirement class.
     *
     * @param command   Command that needs to be in the stack.
     * @param depth   How the command's location within a context may allow a match.
     */
    public constructor(command: string, depth: ContextMatchDepth = ContextMatchDepth.Any) {
        this.command = command;
        this.depth = depth;
    }

    /**
     * Tests whether a match is allowed to be executed.
     *
     * @param input   Line of input.
     * @param contextTracker   Tracks a command context stack.
     * @returns Whether the match is allowed to be executed.
     */
    public test(input: string, contextTracker: IContextTracker): boolean {
        if (this.depth === ContextMatchDepth.OnlyShallow) {
            return this.command === contextTracker.context[contextTracker.context.length - 1];
        }

        for (const command of contextTracker.context) {
            if (command === this.command) {
                return this.depth === ContextMatchDepth.OnlyDeep
                    ? command !== contextTracker.context[contextTracker.context.length - 1]
                    : true;
            }
        }

        return false;
    }
}
