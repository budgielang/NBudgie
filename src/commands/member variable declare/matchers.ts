import { IMatchersList } from "../../matchers";
import { ContextClosestRequirement } from "../../matchTests/contextClosestRequirement";
import { ContextExclusionRequirement } from "../../matchTests/contextExclusionRequirement";
import { ContextMatchDepth, ContextMatchRequirement } from "../../matchTests/contextMatchRequirement";
import { RegExpMatchTest } from "../../matchTests/regExpMatchTest";
import { ICommandArgs } from "./command";

export class MatchersList implements IMatchersList {
    public readonly matchers = [
        {
            test: new RegExpMatchTest(
                /(private|protected|public) (member|variable) named (\S+) of type (\S+)/g,
                new ContextMatchRequirement("class start", ContextMatchDepth.OnlyShallow)),
            parseArgs(matches: RegExpMatchArray): ICommandArgs {
                return {
                    name: matches[3],
                    privacy: matches[1],
                    type: matches[4],
                };
            },
        },
        {
            test: new RegExpMatchTest(
                /(private|protected|public) (member|variable) of type (\S+) named (\S+)/g,
                new ContextMatchRequirement("class start", ContextMatchDepth.OnlyShallow)),
            parseArgs(matches: RegExpMatchArray): ICommandArgs {
                return {
                    name: matches[4],
                    privacy: matches[1],
                    type: matches[3],
                };
            },
        },
        {
            test: new RegExpMatchTest(
                /(private|protected|public) (\S+) named (\S+)/g,
                new ContextMatchRequirement("class start", ContextMatchDepth.OnlyShallow)),
            parseArgs(matches: RegExpMatchArray): ICommandArgs {
                return {
                    name: matches[3],
                    privacy: matches[1],
                    type: matches[2],
                };
            },
        },
        {
            test: new RegExpMatchTest(
                /(private|protected|public) (\S+) of type (\S+)/g,
                new ContextMatchRequirement("class start", ContextMatchDepth.OnlyShallow)),
            parseArgs(matches: RegExpMatchArray): ICommandArgs {
                return {
                    name: matches[2],
                    privacy: matches[1],
                    type: matches[3],
                };
            },
        },
    ];
}
