import { IMatchersList } from "../../../matchers";
import { RegExpMatchTest } from "../../../matchTests/regExpMatchTest";
import { ICommandArgs } from "./command";

export class MatchersList implements IMatchersList {
    public readonly matchers = [
        {
            test: new RegExpMatchTest(/(local|new) variable named (.+) of type (.+) equal to (.+)/g),
            parseArgs(matches: RegExpMatchArray): ICommandArgs {
                return {
                    name: matches[2],
                    type: matches[3],
                    value: matches[4],
                };
            },
        },
        {
            test: new RegExpMatchTest(/(local|new) variable named (.+) of type (.+)/g),
            parseArgs(matches: RegExpMatchArray): ICommandArgs {
                return {
                    name: matches[2],
                    type: matches[3],
                };
            },
        },
        {
            test: new RegExpMatchTest(/(local|new) variable of type (.+) named (.+) equal to (.+)/g),
            parseArgs(matches: RegExpMatchArray): ICommandArgs {
                return {
                    name: matches[3],
                    type: matches[2],
                    value: matches[4],
                };
            },
        },
        {
            test: new RegExpMatchTest(/(local|new) variable of type (.+) named (.+)/g),
            parseArgs(matches: RegExpMatchArray): ICommandArgs {
                return {
                    name: matches[3],
                    type: matches[2],
                };
            },
        },
        {
            test: new RegExpMatchTest(/(local|new) (float|int|string) named (.+) equal to (.+)/g),
            parseArgs(matches: RegExpMatchArray): ICommandArgs {
                return {
                    name: matches[3],
                    type: matches[2],
                    value: matches[4],
                };
            },
        },
        {
            test: new RegExpMatchTest(/(local|new) (float|int|string) named (.+)/g),
            parseArgs(matches: RegExpMatchArray): ICommandArgs {
                return {
                    name: matches[3],
                    type: matches[2],
                };
            },
        },
    ];
}
