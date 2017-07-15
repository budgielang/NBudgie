import { expect } from "chai";
import * as path from "path";
import { stub } from "sinon";

import { ClassInstanceFactory } from "../../../src/factories/classInstanceFactory";

class StubClass { }

const stubClassName = "foo";
const createStubDependencies = () => ({
    importFile: stub().returns(Promise.resolve({
        [stubClassName]: StubClass,
    })),
    rootDirectory: "root",
});

describe("ClassInstanceFactory", () => {
    describe("getClassInstance", () => {
        it("creates a class instance from a file in the root directory", async () => {
            // Arrange
            const dependencies = createStubDependencies();
            const classInstanceFactory = new ClassInstanceFactory(dependencies);
            const relativePath = "dir/file";

            // Act
            classInstanceFactory.getClassInstance(relativePath, stubClassName);

            // Assert
            expect(dependencies.importFile).to.have.been.calledWithExactly([
                path.join(dependencies.rootDirectory, relativePath),
                stubClassName,
            ]);
        });

        it("caches instances on repeated calls", async () => {
            // Arrange
            const dependencies = createStubDependencies();
            const classInstanceFactory = new ClassInstanceFactory(dependencies);
            const relativePath = "dir/file";

            // Act
            const first = classInstanceFactory.getClassInstance(relativePath, stubClassName);
            const second = classInstanceFactory.getClassInstance(relativePath, stubClassName);

            // Assert
            expect(first).to.be.equal(second);
        });
    });
});
