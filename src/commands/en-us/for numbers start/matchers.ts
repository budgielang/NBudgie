import { IMatchersList } from "../../../matchers";
import { ICommandArgs } from "./command";

export class MatchersList implements IMatchersList {
    public readonly matchers = [
        {
            expression: /for loop (for|on) (.+) from (-?\d?\.?\d+) to (-?\d?\.?\d+)/,
            parseArgs(matches: RegExpMatchArray): ICommandArgs {
                return {
                    end: matches[4],
                    name: matches[2],
                    start: matches[3],
                };
            },
        },
    ];
}
