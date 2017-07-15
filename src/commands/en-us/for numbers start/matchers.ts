import { IMatchersList } from "../../../matchers";
import { ICommandArgs } from "./command";

export class Matcher implements IMatchersList {
    public readonly matchers = [
        {
            expression: /for loop (for|on) (.+) from (-?\d?\.?\d+) to (-?\d?\.?\d+)/,
            parseArgs(matches: RegExpMatchArray): ICommandArgs {
                return {
                    end: parseFloat(matches[2]),
                    name: matches[0],
                    start: parseFloat(matches[1]),
                };
            },
        },
    ];
}
