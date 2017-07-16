import { IMatchersList } from "../../../matchers";
import { RegExpExclusionRequirement } from "../../../matchTests/regExpExclusionRequirement";
import { RegExpMatchTest } from "../../../matchTests/regExpMatchTest";
import { ICommandArgs } from "./command";

export class MatchersList implements IMatchersList {
    public readonly matchers = [
        {
            test: new RegExpMatchTest(
                /(as|so) long as (.+)/,
                new RegExpExclusionRequirement(/(close|end|finish)(.+)while/i)),
            parseArgs(matches: RegExpMatchArray): ICommandArgs {
                return {
                    conditional: matches[2],
                };
            },
        },
        {
            test: new RegExpMatchTest(
                /while (.+)/,
                new RegExpExclusionRequirement(/(close|end|finish)(.+)while/i)),
            parseArgs(matches: RegExpMatchArray): ICommandArgs {
                return {
                    conditional: matches[1],
                };
            },
        },
    ];
}
