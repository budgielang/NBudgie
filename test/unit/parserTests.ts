import { expect } from "chai";
import { stub } from "sinon";

import { ClassInstanceFactory } from "../../lib/factories/classInstanceFactory";
import { CommandsAndMatchersFactory } from "../../lib/factories/commandsAndMatchersFactory";
import { Parser } from "../../lib/parser";

describe("Parser", () => {
    describe("parseLine", () => {
        it("renders with a single command that matches", async () => {
            // Arrange
            const result = {};
            const command = {
                render: stub().returns(result),
            };
            const matchersList = {
                matchers: [{
                    expression: /.*/,
                    parseArgs: stub(),
                }],
            };
            const commandNames = ["valid"];
            const commandsAndMatchersFactory = {
                getCommand: stub().returns(Promise.resolve(command)),
                getMatchersList: stub().returns(Promise.resolve(matchersList)),
            };
            const parser = new Parser({ commandNames, commandsAndMatchersFactory });

            // Act
            const parsed = await parser.parseLine("");

            // Assert
            expect(parsed).to.be.equal(result);
        });

        it("renders with a matching command between non-matching commands", async () => {
            // Arrange
            const result = {};
            const invalidCommand = {
                render: stub(),
            };
            const validCommand = {
                render: stub().returns(result),
            };
            const invalidMatchersList = {
                matchers: [{
                    expression: /$a/,
                    parseArgs: stub(),
                }],
            };
            const validMatchersList = {
                matchers: [{
                    expression: /.*/,
                    parseArgs: stub(),
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
            const parsed = await parser.parseLine("");

            // Assert
            expect(parsed).to.be.equal(result);
        });

        it("returns undefined if no commands match", async () => {
            // Arrange
            const invalidCommand = {
                render: stub(),
            };
            const invalidMatchersList = {
                matchers: [{
                    expression: /$a/,
                    parseArgs: stub(),
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
            const parsed = await parser.parseLine("");

            // Assert
            expect(parsed).to.be.equal(undefined);
        });
    });
});
