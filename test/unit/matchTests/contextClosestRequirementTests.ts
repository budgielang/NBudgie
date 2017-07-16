import { expect } from "chai";
import * as path from "path";
import { stub } from "sinon";

import { ContextClosestRequirement } from "../../../lib/matchTests/contextClosestRequirement";

const primaryCommand = "primaryCommand";
const excludedCommands = ["excluded", "invalid"];
const irrelevantCommands = ["ignored", "irrelevant"];

const stubContextTracker = (context: string[]) => ({
    change: stub(),
    context,
});
const stubRequirement = () => new ContextClosestRequirement(primaryCommand, excludedCommands);

describe("ContextClosestRequirement", () => {
    describe("test", () => {
        it("accepts an empty context", () => {
            // Arrange
            const requirement = stubRequirement();
            const contextTracker = stubContextTracker([]);

            // Act
            const allowed = requirement.test("", contextTracker);

            // Assert
            expect(allowed).to.be.equal(true);
        });

        it("accepts a context with irrelevant commands", () => {
            // Arrange
            const requirement = stubRequirement();
            const contextTracker = stubContextTracker(irrelevantCommands);

            // Act
            const allowed = requirement.test("", contextTracker);

            // Assert
            expect(allowed).to.be.equal(true);
        });

        it("accepts a context with only the primary command", () => {
            // Arrange
            const requirement = stubRequirement();
            const contextTracker = stubContextTracker([primaryCommand]);

            // Act
            const allowed = requirement.test("", contextTracker);

            // Assert
            expect(allowed).to.be.equal(true);
        });

        it("accepts a context with the primary command and irrelevant commands", () => {
            // Arrange
            const requirement = stubRequirement();
            const contextTracker = stubContextTracker([primaryCommand, ...irrelevantCommands]);

            // Act
            const allowed = requirement.test("", contextTracker);

            // Assert
            expect(allowed).to.be.equal(true);
        });

        it("accepts a context with the primary command after exclusion commands", () => {
            // Arrange
            const requirement = stubRequirement();
            const contextTracker = stubContextTracker([...excludedCommands, primaryCommand]);

            // Act
            const allowed = requirement.test("", contextTracker);

            // Assert
            expect(allowed).to.be.equal(true);
        });

        it("rejects a context with the primary command before exclusion commands", () => {
            // Arrange
            const requirement = stubRequirement();
            const contextTracker = stubContextTracker([primaryCommand, ...excludedCommands]);

            // Act
            const allowed = requirement.test("", contextTracker);

            // Assert
            expect(allowed).to.be.equal(false);
        });

        it("rejects a context without the primary command but with exclusion commands", () => {
            // Arrange
            const requirement = stubRequirement();
            const contextTracker = stubContextTracker(excludedCommands);

            // Act
            const allowed = requirement.test("", contextTracker);

            // Assert
            expect(allowed).to.be.equal(false);
        });
    });
});
