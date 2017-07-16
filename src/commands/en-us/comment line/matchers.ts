import { IMatchersList } from "../../../matchers";
import { RegExpMatchTest } from "../../../matchTests/regExpMatchTest";
import { ICommandArgs } from "./command";

export class MatchersList implements IMatchersList {
    public readonly matchers = [
        {
            test: new RegExpMatchTest(/comment (noting|saying|that) (.+)/i),
            parseArgs(matches: RegExpMatchArray): ICommandArgs {
                return {
                    word: matches[2],
                };
            },
        },
    ];
}
