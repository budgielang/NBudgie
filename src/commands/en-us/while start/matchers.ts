import { IMatchersList } from "../../../matchers";
import { RegExpExclusionRequirement } from "../../../matchTests/regExpExclusionRequirement";
import { RegExpMatchTest } from "../../../matchTests/regExpMatchTest";
import { ICommandArgs } from "./command";

export class MatchersList implements IMatchersList {
    public readonly matchers = [
        {
            test: new RegExpMatchTest(
                /(as|so) long as (.+)/i,
                new RegExpExclusionRequirement(/(break|close|end|finish)(.+)while/i)),
            parseArgs(matches: RegExpMatchArray): ICommandArgs {
                return {
                    conditional: matches[2],
                };
            },
        },
        {
            test: new RegExpMatchTest(
                /while (.+)/i,
                new RegExpExclusionRequirement(/(break|close|end|finish)(.+)while/i)),
            parseArgs(matches: RegExpMatchArray): ICommandArgs {
                return {
                    conditional: matches[1],
                };
            },
        },
    ];
}
