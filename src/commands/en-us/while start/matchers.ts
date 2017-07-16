import { IMatchersList } from "../../../matchers";
import { RegExpMatchTest } from "../../../matchTests/regExpMatchTest";
import { ICommandArgs } from "./command";

export class MatchersList implements IMatchersList {
    public readonly matchers = [
        {
            test: new RegExpMatchTest(/(as|so) long as (.+)/),
            parseArgs(matches: RegExpMatchArray): ICommandArgs {
                return {
                    conditional: matches[2],
                };
            },
        },
        {
            test: new RegExpMatchTest(/while (.+)/),
            parseArgs(matches: RegExpMatchArray): ICommandArgs {
                return {
                    conditional: matches[1],
                };
            },
        },
    ];
}
