import { IMatchersList } from "../../../matchers";
import { ContextMatchRequirement } from "../../../matchTests/contextMatchRequirement";
import { RegExpMatchTest } from "../../../matchTests/regExpMatchTest";

export class MatchersList implements IMatchersList {
    public readonly matchers = [
        {
            test: new RegExpMatchTest(
                /(close|end|finish) the loop/i,
                new ContextMatchRequirement("for each start")),
            parseArgs(matches: RegExpMatchArray): {} {
                return {};
            },
        },
    ];
}
