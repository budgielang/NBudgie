import { IMatchersList } from "../../../matchers";
import { RegExpExclusionRequirement } from "../../../matchTests/regExpExclusionRequirement";
import { RegExpMatchTest } from "../../../matchTests/regExpMatchTest";
import { ICommandArgs } from "./command";

export class MatchersList implements IMatchersList {
    public readonly matchers = [
        {
            test: new RegExpMatchTest(/class (called|named) (.+)/i),
            parseArgs(matches: RegExpMatchArray): ICommandArgs {
                return {
                    classDescriptor: matches[2],
                };
            },
        },
    ];
}
