import { IContextTracker } from "../contextTracker";
import { IMatchRequirement } from "../matchers";

/**
 * Tests whether matches are allowed to be executed with input strings.
 */
export class RegExpExclusionRequirement implements IMatchRequirement {
    /**
     * Excludes input strings from match execution.
     */
    private readonly exclusion: RegExp;

    /**
     * Initializes a new instance of the RegExpExclusionRequirement class.
     *
     * @param exclusion   Excludes input strings from match execution.
     */
    public constructor(exclusion: RegExp) {
        this.exclusion = exclusion;
    }

    /**
     * Tests whether a match is allowed to be executed.
     *
     * @param input   Line of input.
     * @returns Whether the match is allowed to be executed.
     */
    public test(input: string): boolean {
        return !this.exclusion.test(input);
    }
}
