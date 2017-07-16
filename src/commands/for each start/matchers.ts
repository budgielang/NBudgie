import { IMatchersList } from "../../matchers";
import { RegExpMatchTest } from "../../matchTests/regExpMatchTest";
import { ICommandArgs } from "./command";

export class MatchersList implements IMatchersList {
    public readonly matchers = [
        {
            test: new RegExpMatchTest(/for each (.+) in (.+) of type (.+)/i),
            parseArgs(matches: RegExpMatchArray): ICommandArgs {
                return {
                    container: matches[2],
                    value: matches[1],
                    valueType: matches[3],
                };
            },
        },
        {
            test: new RegExpMatchTest(/for each (.+) of type (.+) in (.+)/i),
            parseArgs(matches: RegExpMatchArray): ICommandArgs {
                return {
                    container: matches[3],
                    value: matches[1],
                    valueType: matches[2],
                };
            },
        },
        {
            test: new RegExpMatchTest(/for each (.+) (.+) in (.+)/i),
            parseArgs(matches: RegExpMatchArray): ICommandArgs {
                return {
                    container: matches[3],
                    value: matches[2],
                    valueType: matches[1],
                };
            },
        },
    ];
}
