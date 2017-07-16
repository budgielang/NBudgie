import { expect } from "chai";
import * as path from "path";

import { RegExpExclusionRequirement } from "../../../lib/matchTests/regExpExclusionRequirement";

describe("RegExpExclusionRequirement", () => {
    describe("test", () => {
        it("accepts an unmatched string", () => {
            // Arrange
            const requirement = new RegExpExclusionRequirement(/$^/);

            // Act
            const allowed = requirement.test(" ");

            // Assert
            expect(allowed).to.be.equal(true);
        });

        it("rejects a matched string", () => {
            // Arrange
            const requirement = new RegExpExclusionRequirement(/ /);

            // Act
            const allowed = requirement.test(" ");

            // Assert
            expect(allowed).to.be.equal(false);
        });
    });
});
