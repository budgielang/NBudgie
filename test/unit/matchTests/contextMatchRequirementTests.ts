import { expect } from "chai";
import * as path from "path";
import { stub } from "sinon";

import { IContextTracker } from "../../../lib/contextTracker";
import { ContextMatchDepth, ContextMatchRequirement } from "../../../lib/matchTests/contextMatchRequirement";

describe("ContextMatchRequirement", () => {
    describe("test", () => {
        const stubCommand = "stub";
        const stubCommandChanged = `${stubCommand} changed`;

        const descriptors = {
            [stubCommand]: "matching command",
            [stubCommandChanged]: "non-matching command",
        };

        const generateDescriptor = (context: [string] | [string, string], expected: boolean) => {
            const prefix = expected
                ? "allows"
                : "doesn't allow";

            const body = context
                .map((command) => descriptors[command])
                .reverse()
                .join(" within a ");

            return `${prefix} a ${body}`;
        };

        const testOrderToValidity = (context: [string] | [string, string], expected: boolean, depth?: ContextMatchDepth) => {
            it(generateDescriptor(context, expected), () => {
                // Arrange
                const requirement = new ContextMatchRequirement(stubCommand, depth);
                const tracker: IContextTracker = {
                    change: stub(),
                    context,
                };

                // Act
                const allowed = requirement.test("", tracker);

                // Assert
                expect(allowed).to.be.equal(expected);
            });
        };

        describe("default", () => {
            testOrderToValidity([stubCommand], true);
            testOrderToValidity([stubCommandChanged], false);
        });

        describe("Any", () => {
            testOrderToValidity([stubCommandChanged, stubCommand], true, ContextMatchDepth.Any);
            testOrderToValidity([stubCommand, stubCommandChanged], true, ContextMatchDepth.Any);
        });

        describe("OnlyShallow", () => {
            testOrderToValidity([stubCommandChanged, stubCommand], true, ContextMatchDepth.OnlyShallow);
            testOrderToValidity([stubCommand, stubCommandChanged], false, ContextMatchDepth.OnlyShallow);
        });

        describe("OnlyDeep", () => {
            testOrderToValidity([stubCommandChanged, stubCommand], false, ContextMatchDepth.OnlyDeep);
            testOrderToValidity([stubCommand, stubCommandChanged], true, ContextMatchDepth.OnlyDeep);
        });
    });
});
