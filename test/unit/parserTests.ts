import { expect } from "chai";
import { stub } from "sinon";

import { ICommand, IRenderedCommand } from "../../lib/command";
import { ClassInstanceFactory } from "../../lib/factories/classInstanceFactory";
import { CommandsAndMatchersFactory } from "../../lib/factories/commandsAndMatchersFactory";
import { RegExpMatchTest } from "../../lib/matchTests/regExpMatchTest";
import { Parser } from "../../lib/parser";

describe("Parser", () => {
    describe("parseLines", () => {
        it("renders with a single command that matches", async () => {
            // Arrange
            const result: IRenderedCommand = {
                lines: [[""]],
            };
            const command: ICommand = {
                render: stub().returns(result),
            };
            const matchersList = {
                matchers: [{
                    parseArgs: stub(),
                    test: new RegExpMatchTest(/.*/),
                }],
            };
            const commandNames = ["valid"];
            const commandsAndMatchersFactory = {
                getCommand: stub().returns(Promise.resolve(command)),
                getMatchersList: stub().returns(Promise.resolve(matchersList)),
            };
            const parser = new Parser({ commandNames, commandsAndMatchersFactory });

            // Act
            const parsed = await parser.parseLines([""]);

            // Assert
            expect(parsed).to.be.deep.equal(result.lines[0]);
        });

        it("renders with a matching command between non-matching commands", async () => {
            // Arrange
            const result: IRenderedCommand = {
                lines: [[""]],
            };
            const invalidCommand: ICommand = {
                render: stub(),
            };
            const validCommand: ICommand = {
                render: stub().returns(result),
            };
            const invalidMatchersList = {
                matchers: [{
                    parseArgs: stub(),
                    test: new RegExpMatchTest(/$a/),
                }],
            };
            const validMatchersList = {
                matchers: [{
                    parseArgs: stub(),
                    test: new RegExpMatchTest(/.*/),
                }],
            };
            const commandNames = ["first", "valid", "third"];
            const commandsAndMatchersFactory = {
                getCommand: stub()
                    .withArgs("first").returns(Promise.resolve(invalidCommand))
                    .withArgs("third").returns(Promise.resolve(invalidCommand))
                    .withArgs("valid").returns(Promise.resolve(validCommand)),
                getMatchersList: stub()
                    .withArgs("first").returns(Promise.resolve(invalidMatchersList))
                    .withArgs("third").returns(Promise.resolve(invalidMatchersList))
                    .withArgs("valid").returns(Promise.resolve(validMatchersList)),
            };
            const parser = new Parser({ commandNames, commandsAndMatchersFactory });

            // Act
            const parsed = await parser.parseLines([""]);

            // Assert
            expect(parsed).to.be.deep.equal(result.lines[0]);
        });

        it("returns nothing if no commands match", async () => {
            // Arrange
            const invalidCommand = {
                render: stub(),
            };
            const invalidMatchersList = {
                matchers: [{
                    parseArgs: stub(),
                    test: new RegExpMatchTest(/$a/),
                }],
            };
            const commandNames = ["invalid"];
            const commandsAndMatchersFactory = {
                getCommand: stub()
                    .withArgs("invalid").returns(Promise.resolve(invalidCommand)),
                getMatchersList: stub()
                    .withArgs("invalid").returns(Promise.resolve(invalidMatchersList)),
            };
            const parser = new Parser({ commandNames, commandsAndMatchersFactory });

            // Act
            const parsed = await parser.parseLines([""]);

            // Assert
            expect(parsed).to.be.deep.equal([""]);
        });
    });
});
