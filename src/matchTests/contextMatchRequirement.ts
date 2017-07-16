import { IContextTracker } from "../contextTracker";
import { IMatchRequirement } from "../matchers";

/**
 * Tests whether matches are allowed to be executed in a type of context.
 */
export class ContextMatchRequirement implements IMatchRequirement {
    /**
     * Whether the context is allowed to be deep within the stack.
     */
    private readonly allowDeep: boolean;

    /**
     * Command that needs to be in the stack.
     */
    private readonly command: string;

    /**
     * Initializes a new instance of the ContextMatchRequirement class.
     *
     * @param command   Command that needs to be in the stack.
     * @param allowDeep   Whether the context is allowed to be deep within the stack.
     */
    public constructor(command: string, allowDeep: boolean = false) {
        this.allowDeep = allowDeep;
        this.command = command;
    }

    /**
     * Tests whether a match is allowed to be executed.
     *
     * @param input   Line of input.
     * @param contextTracker   Tracks a command context stack.
     * @returns Whether the match is allowed to be executed.
     */
    public test(input: string, contextTracker: IContextTracker): boolean {
        if (!this.allowDeep) {
            return this.command === contextTracker.context[0];
        }

        for (const command of contextTracker.context) {
            if (command === this.command) {
                return true;
            }
        }

        return false;
    }
}
