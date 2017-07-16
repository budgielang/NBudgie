import { IMatchersList } from "../../matchers";
import { RegExpMatchTest } from "../../matchTests/regExpMatchTest";
import { ICommandArgs } from "./command";

export class MatchersList implements IMatchersList {
    public readonly matchers = [
        {
            test: new RegExpMatchTest(/(.*)'s (private|protected|public) (member|property) (.+)/g),
            parseArgs(matches: RegExpMatchArray): ICommandArgs {
                return {
                    instanceName: matches[1],
                    privacy: matches[2],
                    variableName: matches[4],
                };
            },
        },
        {
            test: new RegExpMatchTest(/(.*)'s (private|protected|public) (.+)/g),
            parseArgs(matches: RegExpMatchArray): ICommandArgs {
                return {
                    instanceName: matches[1],
                    privacy: matches[2],
                    variableName: matches[3],
                };
            },
        },
        {
            test: new RegExpMatchTest(/(.*)'s (member|property) (.+)/g),
            parseArgs(matches: RegExpMatchArray): ICommandArgs {
                return {
                    instanceName: matches[1],
                    privacy: "public",
                    variableName: matches[3],
                };
            },
        },
        {
            test: new RegExpMatchTest(/(.*)'s (.+)/g),
            parseArgs(matches: RegExpMatchArray): ICommandArgs {
                return {
                    instanceName: matches[1],
                    privacy: "public",
                    variableName: matches[2],
                };
            },
        },
        {
            test: new RegExpMatchTest(/our (private|protected|public) (member|property) (.+)/g),
            parseArgs(matches: RegExpMatchArray): ICommandArgs {
                return {
                    instanceName: "{ this }",
                    privacy: matches[1],
                    variableName: matches[3],
                };
            },
        },
        {
            test: new RegExpMatchTest(/our (member|property) (.+)/g),
            parseArgs(matches: RegExpMatchArray): ICommandArgs {
                return {
                    instanceName: "{ this }",
                    privacy: "public",
                    variableName: matches[2],
                };
            },
        },
        {
            test: new RegExpMatchTest(/our (private|protected|public) (.+)/g),
            parseArgs(matches: RegExpMatchArray): ICommandArgs {
                return {
                    instanceName: "{ this }",
                    privacy: matches[1],
                    variableName: matches[2],
                };
            },
        },
        {
            test: new RegExpMatchTest(/our (.+)/g),
            parseArgs(matches: RegExpMatchArray): ICommandArgs {
                return {
                    instanceName: "{ this }",
                    privacy: "public",
                    variableName: matches[1],
                };
            },
        },
    ];
}
