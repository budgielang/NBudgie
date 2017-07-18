import { IMatchersList } from "../../matchers";
import { ContextMatchDepth, ContextMatchRequirement } from "../../matchTests/contextMatchRequirement";
import { RegExpMatchTest } from "../../matchTests/regExpMatchTest";

export class MatchersList implements IMatchersList {
    public readonly matchers = [
        {
            test: new RegExpMatchTest(
                /(close|end|finish) the while (block|statement)/i,
                new ContextMatchRequirement("while start", ContextMatchDepth.OnlyShallow)),
            parseArgs(matches: RegExpMatchArray): {} {
                return {};
            },
        },
    ];
}
