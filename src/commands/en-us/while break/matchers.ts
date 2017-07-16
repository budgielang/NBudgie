import { IMatchersList } from "../../../matchers";
import { ContextClosestRequirement } from "../../../matchTests/contextClosestRequirement";
import { ContextMatchRequirement } from "../../../matchTests/contextMatchRequirement";
import { RegExpMatchTest } from "../../../matchTests/regExpMatchTest";

export class MatchersList implements IMatchersList {
    public readonly matchers = [
        {
            test: new RegExpMatchTest(
                /(break|break out of) the while (block|statement)/i,
                new ContextMatchRequirement("while start", true),
                new ContextClosestRequirement(
                    "while start",
                    [
                        "for each key start",
                        "for each pair start",
                        "for each start",
                    ])),
            parseArgs(matches: RegExpMatchArray): {} {
                return {};
            },
        },
    ];
}
