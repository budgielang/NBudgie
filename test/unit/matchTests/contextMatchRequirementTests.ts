import { expect } from "chai";
import * as path from "path";
import { stub } from "sinon";

import { IContextTracker } from "../../../lib/contextTracker";
import { ContextMatchRequirement } from "../../../lib/matchTests/contextMatchRequirement";

const stubCommand = "stub";

describe("ContextMatchRequirement", () => {
    describe("test", () => {
        it("allows a shallow matching command", () => {
            // Arrange
            const requirement = new ContextMatchRequirement(stubCommand);
            const tracker: IContextTracker = {
                change: stub(),
                context: [stubCommand],
            };

            // Act
            const allowed = requirement.test("", tracker);

            // Assert
            expect(allowed).to.be.equal(true);
        });

        it("rejects a missing command", () => {
            // Arrange
            const requirement = new ContextMatchRequirement(stubCommand);
            const tracker: IContextTracker = {
                change: stub(),
                context: [`${stubCommand} changed`],
            };

            // Act
            const allowed = requirement.test("", tracker);

            // Assert
            expect(allowed).to.be.equal(false);
        });

        it("rejects a deep matching command if not set to allow deep", () => {
            // Arrange
            const requirement = new ContextMatchRequirement(stubCommand);
            const tracker: IContextTracker = {
                change: stub(),
                context: [stubCommand, `${stubCommand} changed`],
            };

            // Act
            const allowed = requirement.test("", tracker);

            // Assert
            expect(allowed).to.be.equal(false);
        });

        it("allows a deep matching command if set to allow deep", () => {
            // Arrange
            const requirement = new ContextMatchRequirement(stubCommand, true);
            const tracker: IContextTracker = {
                change: stub(),
                context: [stubCommand, `${stubCommand} changed`],
            };

            // Act
            const allowed = requirement.test("", tracker);

            // Assert
            expect(allowed).to.be.equal(true);
        });
    });
});
