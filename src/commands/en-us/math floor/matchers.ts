import { IMatchersList } from "../../../matchers";
import { RegExpMatchTest } from "../../../matchTests/regExpMatchTest";
import { ICommandArgs } from "./command";

export class MatchersList implements IMatchersList {
    public readonly matchers = [
        {
            test: new RegExpMatchTest(/(floor|floored|rounded down) ((equivalent|value) (for|of|to)) (.+)/i),
            parseArgs(matches: RegExpMatchArray): ICommandArgs {
                return {
                    name: matches[5],
                };
            },
        },
    ];
}
