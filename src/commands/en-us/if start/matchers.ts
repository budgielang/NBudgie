import { IMatchersList } from "../../../matchers";
import { RegExpExclusionRequirement } from "../../../matchTests/regExpExclusionRequirement";
import { RegExpMatchTest } from "../../../matchTests/regExpMatchTest";
import { ICommandArgs } from "./command";

export class MatchersList implements IMatchersList {
    public readonly matchers = [
        {
            test: new RegExpMatchTest(
                /if (.+)/,
                new RegExpExclusionRequirement(/(close|end|finish)(.+)if/i)),
            parseArgs(matches: RegExpMatchArray): ICommandArgs {
                return {
                    conditional: matches[1],
                };
            },
        },
    ];
}
