import { IMatchersList } from "../../matchers";
import { RegExpExclusionRequirement } from "../../matchTests/regExpExclusionRequirement";
import { RegExpMatchTest } from "../../matchTests/regExpMatchTest";
import { ICommandArgs } from "./command";

const parseImplements = (matches: string): string[] =>
    matches
        .replace(/( and)|,/gi, "")
        .split(" ");

export class MatchersList implements IMatchersList {
    public readonly matchers = [
        {
            // tslint:disable-next-line:max-line-length
            test: new RegExpMatchTest(/class (called|named) (.+) (extending|that extends)(( from)*) (.+) and that (implementing|implements|implements) (.+)/i),
            parseArgs(matches: RegExpMatchArray): ICommandArgs {
                return {
                    classDescriptor: matches[2],
                    extends: matches[6],
                    implements: parseImplements(matches[8]),
                };
            },
        },
        {
            // tslint:disable-next-line:max-line-length
            test: new RegExpMatchTest(/class (called|named) (.+) (extending|that extends)(( from)*) (.+) and (implementing|implements|implements) (.+)/i),
            parseArgs(matches: RegExpMatchArray): ICommandArgs {
                return {
                    classDescriptor: matches[2],
                    extends: matches[6],
                    implements: parseImplements(matches[8]),
                };
            },
        },
        {
            // tslint:disable-next-line:max-line-length
            test: new RegExpMatchTest(/class (called|named) (.+) (extending|that extends)(( from)*) (.+) that (implementing|implements|implements) (.+)/i),
            parseArgs(matches: RegExpMatchArray): ICommandArgs {
                return {
                    classDescriptor: matches[2],
                    extends: matches[6],
                    implements: parseImplements(matches[8]),
                };
            },
        },
        {
            // tslint:disable-next-line:max-line-length
            test: new RegExpMatchTest(/class (called|named) (.+) (extending|that extends)(( from)*) (.+) (implementing|implements|implements) (.+)/i),
            parseArgs(matches: RegExpMatchArray): ICommandArgs {
                return {
                    classDescriptor: matches[2],
                    extends: matches[6],
                    implements: parseImplements(matches[8]),
                };
            },
        },
        {
            // tslint:disable-next-line:max-line-length
            test: new RegExpMatchTest(/class (called|named) (.+) (implementing|that implements) (.+) and that (extending|extends)(( from)*) (.+)/i),
            parseArgs(matches: RegExpMatchArray): ICommandArgs {
                return {
                    classDescriptor: matches[2],
                    extends: matches[6],
                    implements: parseImplements(matches[4]),
                };
            },
        },
        {
            // tslint:disable-next-line:max-line-length
            test: new RegExpMatchTest(/class (called|named) (.+) (implementing|that implements) (.+) and (extending|extends)(( from)*) (.+)/i),
            parseArgs(matches: RegExpMatchArray): ICommandArgs {
                return {
                    classDescriptor: matches[2],
                    extends: matches[8],
                    implements: parseImplements(matches[4]),
                };
            },
        },
        {
            // tslint:disable-next-line:max-line-length
            test: new RegExpMatchTest(/class (called|named) (.+) (implementing|that implements) (.+) that (extending|extends)(( from)*) (.+)/i),
            parseArgs(matches: RegExpMatchArray): ICommandArgs {
                return {
                    classDescriptor: matches[2],
                    extends: matches[8],
                    implements: parseImplements(matches[4]),
                };
            },
        },
        {
            // tslint:disable-next-line:max-line-length
            test: new RegExpMatchTest(/class (called|named) (.+) (implementing|that implements) (.+) (extending|extends)(( from)*) (.+)/i),
            parseArgs(matches: RegExpMatchArray): ICommandArgs {
                return {
                    classDescriptor: matches[2],
                    extends: matches[6],
                    implements: parseImplements(matches[4]),
                };
            },
        },
        {
            test: new RegExpMatchTest(/class (called|named) (.+) (extending|that extends)(( from)*) (.+)/i),
            parseArgs(matches: RegExpMatchArray): ICommandArgs {
                return {
                    classDescriptor: matches[2],
                    extends: matches[6],
                };
            },
        },
        {
            test: new RegExpMatchTest(/class (called|named) (.+)/i),
            parseArgs(matches: RegExpMatchArray): ICommandArgs {
                return {
                    classDescriptor: matches[2],
                };
            },
        },
    ];
}
