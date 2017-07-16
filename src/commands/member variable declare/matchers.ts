import { IMatchersList } from "../../matchers";
import { ContextClosestRequirement } from "../../matchTests/contextClosestRequirement";
import { ContextExclusionRequirement } from "../../matchTests/contextExclusionRequirement";
import { ContextMatchRequirement } from "../../matchTests/contextMatchRequirement";
import { RegExpMatchTest } from "../../matchTests/regExpMatchTest";
import { ICommandArgs } from "./command";

export class MatchersList implements IMatchersList {
    public readonly matchers = [
        {
            test: new RegExpMatchTest(
                /(private|protected|public) (member|variable) named (.+) of type (.+)/g,
                new ContextExclusionRequirement("constructor start"),
                new ContextMatchRequirement("class start")),
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
                /(private|protected|public) (member|variable) of type (.+) named (.+)/g,
                new ContextExclusionRequirement("constructor start"),
                new ContextMatchRequirement("class start"),
                new ContextClosestRequirement(
                    "class start",
                    [
                        "constructor start",
                    ])),
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
