import { IContextTracker } from "../contextTracker";
import { IMatchRequirement } from "../matchers";

/**
 * Tests whether a command is in a context.
 */
export class ContextExclusionRequirement implements IMatchRequirement {
    /**
     * Banned required context command.
     */
    private readonly command: string;

    /**
     * Initializes a new instance of the ContextExclusionRequirement class.
     *
     * @param command   Banned required context command.
     */
    public constructor(command: string) {
        this.command = command;
    }

    /**
     * Attempts to match a string for the command.
     *
     * @param input   Line of input.
     * @param contextTracker   Tracks a command context stack.
     * @returns Whether the match is allowed to be executed.
     */
    public test(input: string, contextTracker: IContextTracker): boolean {
        for (const command of contextTracker.context) {
            if (command === this.command) {
                return false;
            }
        }

        return true;
    }
}
