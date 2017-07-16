import { IMatchersList } from "../../../matchers";
import { RegExpMatchTest } from "../../../matchTests/regExpMatchTest";
import { ICommandArgs } from "./command";

export class MatchersList implements IMatchersList {
    public readonly matchers = [
        {
            onlyDeep: true,
            test: new RegExpMatchTest(/(.+) is equal to (.+)/),
            parseArgs(matches: RegExpMatchArray): ICommandArgs {
                return {
                    item: matches[1],
                    operator: "(equal to)",
                    value: matches[2],
                };
            },
        },
    ];
}
