import { IMatchersList } from "../../matchers";
import { ContextMatchDepth, ContextMatchRequirement } from "../../matchTests/contextMatchRequirement";
import { RegExpMatchTest } from "../../matchTests/regExpMatchTest";

export class MatchersList implements IMatchersList {
    public readonly matchers = [
        {
            test: new RegExpMatchTest(
                /(that is|that's) how (we|you) (do it)|(create a new (.+))/i,
                new ContextMatchRequirement("constructor start", ContextMatchDepth.OnlyShallow)),
            parseArgs(matches: RegExpMatchArray): {} {
                return {};
            },
        },
    ];
}
