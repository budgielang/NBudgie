import { IMatchersList } from "../../matchers";
import { RegExpMatchTest } from "../../matchTests/regExpMatchTest";
import { ICommandArgs } from "./command";

export class MatchersList implements IMatchersList {
    public readonly matchers = [
        {
            test: new RegExpMatchTest(/(lesser|least|smaller|smallest) (between|from|of) (.+) (and|or) (.+)/i),
            parseArgs(matches: RegExpMatchArray): ICommandArgs {
                return {
                    left: matches[3],
                    right: matches[5],
                };
            },
        },
    ];
}
