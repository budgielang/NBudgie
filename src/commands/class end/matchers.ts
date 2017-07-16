import { IMatchersList } from "../../matchers";
import { ContextMatchRequirement } from "../../matchTests/contextMatchRequirement";
import { RegExpMatchTest } from "../../matchTests/regExpMatchTest";

export class MatchersList implements IMatchersList {
    public readonly matchers = [
        {
            test: new RegExpMatchTest(
                /(close|end|finish) the class/i,
                new ContextMatchRequirement("class start")),
            parseArgs(matches: RegExpMatchArray): {} {
                return {};
            },
        },
    ];
}
