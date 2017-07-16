import { IMatchersList } from "../../../matchers";
import { RegExpMatchTest } from "../../../matchTests/regExpMatchTest";
import { ICommandArgs } from "./command";

export class MatchersList implements IMatchersList {
    public readonly matchers = [
        {
            onlyDeep: true,
            test: new RegExpMatchTest(/(.+) (is not|isn't) equal to (.+)/),
            parseArgs(matches: RegExpMatchArray): ICommandArgs {
                return {
                    item: matches[1],
                    operator: "(not equal to)",
                    value: matches[3],
                };
            },
        },
        {
            onlyDeep: true,
            test: new RegExpMatchTest(/(.+) (is equal to|equals) (.+)/),
            parseArgs(matches: RegExpMatchArray): ICommandArgs {
                return {
                    item: matches[1],
                    operator: "(equal to)",
                    value: matches[3],
                };
            },
        },
        {
            onlyDeep: true,
            test: new RegExpMatchTest(/(.+) is (greater than|over) or equal to (.+)/),
            parseArgs(matches: RegExpMatchArray): ICommandArgs {
                return {
                    item: matches[1],
                    operator: "(greater than or equal to)",
                    value: matches[3],
                };
            },
        },
        {
            onlyDeep: true,
            test: new RegExpMatchTest(/(.+) is (greater than|over) (.+)/),
            parseArgs(matches: RegExpMatchArray): ICommandArgs {
                return {
                    item: matches[1],
                    operator: "(greater than)",
                    value: matches[3],
                };
            },
        },
        {
            onlyDeep: true,
            test: new RegExpMatchTest(/(.+) is (less than|under) or equal to (.+)/),
            parseArgs(matches: RegExpMatchArray): ICommandArgs {
                return {
                    item: matches[1],
                    operator: "(less than or equal to)",
                    value: matches[3],
                };
            },
        },
        {
            onlyDeep: true,
            test: new RegExpMatchTest(/(.+) is (less than|under) (.+)/),
            parseArgs(matches: RegExpMatchArray): ICommandArgs {
                return {
                    item: matches[1],
                    operator: "(less than)",
                    value: matches[3],
                };
            },
        },
    ];
}
