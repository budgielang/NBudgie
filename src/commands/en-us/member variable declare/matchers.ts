import { IMatchersList } from "../../../matchers";
import { RegExpMatchTest } from "../../../matchTests/regExpMatchTest";
import { ICommandArgs } from "./command";

export class MatchersList implements IMatchersList {
    public readonly matchers = [
        {
            test: new RegExpMatchTest(/(private|protected|public) (member|variable) named (.+) of type (.+)/g),
            parseArgs(matches: RegExpMatchArray): ICommandArgs {
                return {
                    name: matches[3],
                    privacy: matches[1],
                    type: matches[4],
                };
            },
        },
        {
            test: new RegExpMatchTest(/(private|protected|public) (member|variable) of type (.+) named (.+)/g),
            parseArgs(matches: RegExpMatchArray): ICommandArgs {
                return {
                    name: matches[4],
                    privacy: matches[1],
                    type: matches[3],
                };
            },
        },
    ];
}
