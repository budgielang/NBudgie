import { expect } from "chai";
import { stub } from "sinon";

import { ICommand, IRenderedCommand } from "../../lib/command";
import { ICommandAndMatchers } from "../../lib/commandsAndMatchers";
import { RegExpMatchTest } from "../../lib/matchTests/regExpMatchTest";
import { Parser } from "../../lib/parser";

describe("Parser", () => {
    describe("parseLines", () => {
        it("renders with a single command that matches", async () => {
            // Arrange
            const result: IRenderedCommand = {
                lines: [[""]],
            };
            const parser = new Parser({
                valid: {
                    command: {
                        render: stub().returns(result),
                    },
                    matchersList: {
                        matchers: [{
                            parseArgs: stub(),
                            test: new RegExpMatchTest(/.*/),
                        }],
                    },
                },
            });

            // Act
            const parsed = await parser.parseLines([""]);

            // Assert
            expect(parsed).to.be.deep.equal(result.lines[0]);
        });

        it("renders with a matching command and non-matching commands", async () => {
            // Arrange
            const result: IRenderedCommand = {
                lines: [[""]],
            };
            const invalid: ICommandAndMatchers = {
                command: {
                    render: stub(),
                },
                matchersList: {
                    matchers: [{
                        parseArgs: stub(),
                        test: new RegExpMatchTest(/$a/),
                    }],
                },
            };
            const valid: ICommandAndMatchers = {
                command: {
                    render: stub().returns(result),
                },
                matchersList: {
                    matchers: [{
                        parseArgs: stub(),
                        test: new RegExpMatchTest(/.*/),
                    }],
                },
            };
            const parser = new Parser({
                first: invalid,
                second: valid,
                third: invalid,
            });

            // Act
            const parsed = await parser.parseLines([""]);

            // Assert
            expect(parsed).to.be.deep.equal(result.lines[0]);
        });

        it("returns a blank string for a non-blank line", async () => {
            // Arrange
            const parser = new Parser({
                invalid: {
                    command: {
                        render: stub(),
                    },
                    matchersList: {
                        matchers: [{
                            parseArgs: stub().returns([]),
                            test: new RegExpMatchTest(/$a/),
                        }],
                    },
                },
            });

            // Act
            const parsed = await parser.parseLines([""]);

            // Assert
            expect(parsed).to.be.deep.equal([""]);
        });

        it("returns a comment for a non-blank line if no commands match", async () => {
            // Arrange
            const unknownText = "unknown text";
            const parser = new Parser({
                invalid: {
                    command: {
                        render: stub(),
                    },
                    matchersList: {
                        matchers: [{
                            parseArgs: stub().returns([]),
                            test: new RegExpMatchTest(/$a/),
                        }],
                    },
                },
            });

            // Act
            const parsed = await parser.parseLines([
                unknownText,
            ]);

            // Assert
            expect(parsed).to.be.deep.equal([
                `comment line : ${unknownText}`,
            ]);
        });
    });
});
