import { IMatchersList } from "../../../matchers";
import { RegExpMatchTest } from "../../../matchTests/regExpMatchTest";
import { ICommandArgs } from "./command";

export class MatchersList implements IMatchersList {
    public readonly matchers = [
        {
            test: new RegExpMatchTest(/if (.+)/),
            parseArgs(matches: RegExpMatchArray): ICommandArgs {
                return {
                    conditional: matches[1],
                };
            },
        },
    ];
}
