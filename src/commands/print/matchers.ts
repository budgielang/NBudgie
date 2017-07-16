import { IMatchersList } from "../../matchers";
import { RegExpMatchTest } from "../../matchTests/regExpMatchTest";
import { ICommandArgs } from "./command";

export class MatchersList implements IMatchersList {
    public readonly matchers = [
        {
            test: new RegExpMatchTest(/(log|print) (that|the|out) (.+)/i),
            parseArgs(matches: RegExpMatchArray): ICommandArgs {
                return {
                    message: matches[3],
                };
            },
        },
        {
            test: new RegExpMatchTest(/(log|print) (.+)/i),
            parseArgs(matches: RegExpMatchArray): ICommandArgs {
                return {
                    message: matches[2],
                };
            },
        },
    ];
}
