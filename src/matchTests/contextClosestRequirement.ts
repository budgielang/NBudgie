import { IContextTracker } from "../contextTracker";
import { IMatchRequirement } from "../matchers";

/**
 * Tests whether a command is before other commands in the context.
 */
export class ContextClosestRequirement implements IMatchRequirement {
    /**
     * Closest (primary) required context command.
     */
    private readonly command: string;

    /**
     * Other commands that shouldn't be after the primary command.
     */
    private readonly exclusions: string[];

    /**
     * Initializes a new instance of the RegExpMatchTest class.
     *
     * @param command   Closest (primary) required context command.
     * @param exclusions   Other commands that shouldn't be after the primary command.
     */
    public constructor(command: string, exclusions: string[]) {
        this.command = command;
        this.exclusions = exclusions;
    }

    /**
     * Attempts to match a string for the command.
     *
     * @param input   Line of input.
     * @param contextTracker   Tracks a command context stack.
     * @returns Whether the match is allowed to be executed.
     */
    public test(input: string, contextTracker: IContextTracker): boolean {
        const primaryIndexOf = contextTracker.context.lastIndexOf(this.command);

        for (const excludedCommand of this.exclusions) {
            if (contextTracker.context.indexOf(excludedCommand) > primaryIndexOf) {
                return false;
            }
        }

        return true;
    }
}
