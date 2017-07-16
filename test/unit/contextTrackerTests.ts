import { expect } from "chai";
import { stub } from "sinon";

import { ContextTracker } from "../../lib/contextTracker";

describe("ContextTracker", () => {
    describe("change", () => {
        it("adds a string to a blank context", () => {
            // Arrange
            const tracker = new ContextTracker();
            const change = {
                enter: "abc",
            };

            // Act
            tracker.change(change);

            // Assert
            expect(tracker.context).to.be.deep.equal([
                change.enter,
            ]);
        });

        it("adds a string to an existing context", () => {
            // Arrange
            const tracker = new ContextTracker();
            const changes = [
                {
                    enter: "abc",
                },
                {
                    enter: "def",
                },
            ];
            tracker.change(changes[0]);

            // Act
            tracker.change(changes[1]);

            // Assert
            expect(tracker.context).to.be.deep.equal([
                changes[0].enter,
                changes[1].enter,
            ]);
        });

        it("removes a string from an existing context", () => {
            // Arrange
            const tracker = new ContextTracker();
            const changes = [
                {
                    enter: "abc",
                },
                {
                    enter: "def",
                },
            ];
            tracker.change(changes[0]);
            tracker.change(changes[1]);

            // Act
            tracker.change({
                exit: true,
            });

            // Assert
            expect(tracker.context).to.be.deep.equal([
                changes[0].enter,
            ]);
        });
    });
});
