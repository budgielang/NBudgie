import { IMatchersList } from "../../matchers";
import { ContextMatchRequirement } from "../../matchTests/contextMatchRequirement";
import { RegExpMatchTest } from "../../matchTests/regExpMatchTest";

export class MatchersList implements IMatchersList {
    public readonly matchers = [
        {
            test: new RegExpMatchTest(
                /(that is|that's) how (we|you) (do it)|(create a new (.+))/i,
                new ContextMatchRequirement("constructor start")),
            parseArgs(matches: RegExpMatchArray): {} {
                return {};
            },
        },
    ];
}
