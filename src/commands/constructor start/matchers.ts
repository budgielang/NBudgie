import { IMatchersList } from "../../matchers";
import { RegExpMatchTest } from "../../matchTests/regExpMatchTest";
import { ICommandArgs } from "./command";

export class MatchersList implements IMatchersList {
    public readonly matchers = [
        {
            test: new RegExpMatchTest(/(create|make|instantiate|spin up) a new (.+)/i),
            parseArgs(matches: RegExpMatchArray): ICommandArgs {
                return {
                    className: matches[2],
                };
            },
        },
    ];
}
