import { IMatchersList } from "../../../matchers";
import { RegExpMatchTest } from "../../../matchTests/regExpMatchTest";
import { ICommandArgs } from "./command";

export class MatchersList implements IMatchersList {
    public readonly matchers = [
        {
            test: new RegExpMatchTest(/for loop (for|on) (.+) from (-?\d?\.?\d+) to (-?\d?\.?\d+)/i),
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
