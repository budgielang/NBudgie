"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const path = require("path");
const sinon_1 = require("sinon");
const classInstanceFactory_1 = require("../../../lib/factories/classInstanceFactory");
class StubClass {
}
const stubClassName = "foo";
const createStubDependencies = () => ({
    importFile: sinon_1.stub().returns(Promise.resolve({
        [stubClassName]: StubClass,
    })),
    rootDirectory: "root",
});
describe("ClassInstanceFactory", () => {
    describe("getClassInstance", () => {
        it("creates a class instance from a file in the root directory", () => __awaiter(this, void 0, void 0, function* () {
            // Arrange
            const dependencies = createStubDependencies();
            const classInstanceFactory = new classInstanceFactory_1.ClassInstanceFactory(dependencies);
            const relativePath = "dir/file";
            // Act
            classInstanceFactory.getClassInstance(relativePath, stubClassName);
            // Assert
            chai_1.expect(dependencies.importFile.getCall(0).args).to.be.deep.equal([
                path.join(dependencies.rootDirectory, relativePath),
            ]);
        }));
        it("caches instances on repeated calls", () => __awaiter(this, void 0, void 0, function* () {
            // Arrange
            const dependencies = createStubDependencies();
            const classInstanceFactory = new classInstanceFactory_1.ClassInstanceFactory(dependencies);
            const relativePath = "dir/file";
            // Act
            const first = yield classInstanceFactory.getClassInstance(relativePath, stubClassName);
            const second = yield classInstanceFactory.getClassInstance(relativePath, stubClassName);
            // Assert
            chai_1.expect(first).to.be.equal(second);
        }));
    });
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvdW5pdC9mYWN0b3JpZXMvY2xhc3NJbnN0YW5jZUZhY3RvcnlUZXN0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsK0JBQThCO0FBQzlCLDZCQUE2QjtBQUM3QixpQ0FBNkI7QUFFN0Isc0ZBQW1GO0FBRW5GO0NBQW1CO0FBRW5CLE1BQU0sYUFBYSxHQUFHLEtBQUssQ0FBQztBQUM1QixNQUFNLHNCQUFzQixHQUFHLE1BQU0sQ0FBQztJQUNsQyxVQUFVLEVBQUUsWUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7UUFDdkMsQ0FBQyxhQUFhLENBQUMsRUFBRSxTQUFTO0tBQzdCLENBQUMsQ0FBQztJQUNILGFBQWEsRUFBRSxNQUFNO0NBQ3hCLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxzQkFBc0IsRUFBRTtJQUM3QixRQUFRLENBQUMsa0JBQWtCLEVBQUU7UUFDekIsRUFBRSxDQUFDLDREQUE0RCxFQUFFO1lBQzdELFVBQVU7WUFDVixNQUFNLFlBQVksR0FBRyxzQkFBc0IsRUFBRSxDQUFDO1lBQzlDLE1BQU0sb0JBQW9CLEdBQUcsSUFBSSwyQ0FBb0IsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUNwRSxNQUFNLFlBQVksR0FBRyxVQUFVLENBQUM7WUFFaEMsTUFBTTtZQUNOLG9CQUFvQixDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxhQUFhLENBQUMsQ0FBQztZQUVuRSxTQUFTO1lBQ1QsYUFBTSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDN0QsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxFQUFFLFlBQVksQ0FBQzthQUN0RCxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUEsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLG9DQUFvQyxFQUFFO1lBQ3JDLFVBQVU7WUFDVixNQUFNLFlBQVksR0FBRyxzQkFBc0IsRUFBRSxDQUFDO1lBQzlDLE1BQU0sb0JBQW9CLEdBQUcsSUFBSSwyQ0FBb0IsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUNwRSxNQUFNLFlBQVksR0FBRyxVQUFVLENBQUM7WUFFaEMsTUFBTTtZQUNOLE1BQU0sS0FBSyxHQUFHLE1BQU0sb0JBQW9CLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1lBQ3ZGLE1BQU0sTUFBTSxHQUFHLE1BQU0sb0JBQW9CLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1lBRXhGLFNBQVM7WUFDVCxhQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdEMsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoidGVzdC91bml0L2ZhY3Rvcmllcy9jbGFzc0luc3RhbmNlRmFjdG9yeVRlc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZXhwZWN0IH0gZnJvbSBcImNoYWlcIjtcclxuaW1wb3J0ICogYXMgcGF0aCBmcm9tIFwicGF0aFwiO1xyXG5pbXBvcnQgeyBzdHViIH0gZnJvbSBcInNpbm9uXCI7XHJcblxyXG5pbXBvcnQgeyBDbGFzc0luc3RhbmNlRmFjdG9yeSB9IGZyb20gXCIuLi8uLi8uLi9saWIvZmFjdG9yaWVzL2NsYXNzSW5zdGFuY2VGYWN0b3J5XCI7XHJcblxyXG5jbGFzcyBTdHViQ2xhc3MgeyB9XHJcblxyXG5jb25zdCBzdHViQ2xhc3NOYW1lID0gXCJmb29cIjtcclxuY29uc3QgY3JlYXRlU3R1YkRlcGVuZGVuY2llcyA9ICgpID0+ICh7XHJcbiAgICBpbXBvcnRGaWxlOiBzdHViKCkucmV0dXJucyhQcm9taXNlLnJlc29sdmUoe1xyXG4gICAgICAgIFtzdHViQ2xhc3NOYW1lXTogU3R1YkNsYXNzLFxyXG4gICAgfSkpLFxyXG4gICAgcm9vdERpcmVjdG9yeTogXCJyb290XCIsXHJcbn0pO1xyXG5cclxuZGVzY3JpYmUoXCJDbGFzc0luc3RhbmNlRmFjdG9yeVwiLCAoKSA9PiB7XHJcbiAgICBkZXNjcmliZShcImdldENsYXNzSW5zdGFuY2VcIiwgKCkgPT4ge1xyXG4gICAgICAgIGl0KFwiY3JlYXRlcyBhIGNsYXNzIGluc3RhbmNlIGZyb20gYSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeVwiLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIEFycmFuZ2VcclxuICAgICAgICAgICAgY29uc3QgZGVwZW5kZW5jaWVzID0gY3JlYXRlU3R1YkRlcGVuZGVuY2llcygpO1xyXG4gICAgICAgICAgICBjb25zdCBjbGFzc0luc3RhbmNlRmFjdG9yeSA9IG5ldyBDbGFzc0luc3RhbmNlRmFjdG9yeShkZXBlbmRlbmNpZXMpO1xyXG4gICAgICAgICAgICBjb25zdCByZWxhdGl2ZVBhdGggPSBcImRpci9maWxlXCI7XHJcblxyXG4gICAgICAgICAgICAvLyBBY3RcclxuICAgICAgICAgICAgY2xhc3NJbnN0YW5jZUZhY3RvcnkuZ2V0Q2xhc3NJbnN0YW5jZShyZWxhdGl2ZVBhdGgsIHN0dWJDbGFzc05hbWUpO1xyXG5cclxuICAgICAgICAgICAgLy8gQXNzZXJ0XHJcbiAgICAgICAgICAgIGV4cGVjdChkZXBlbmRlbmNpZXMuaW1wb3J0RmlsZS5nZXRDYWxsKDApLmFyZ3MpLnRvLmJlLmRlZXAuZXF1YWwoW1xyXG4gICAgICAgICAgICAgICAgcGF0aC5qb2luKGRlcGVuZGVuY2llcy5yb290RGlyZWN0b3J5LCByZWxhdGl2ZVBhdGgpLFxyXG4gICAgICAgICAgICBdKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXQoXCJjYWNoZXMgaW5zdGFuY2VzIG9uIHJlcGVhdGVkIGNhbGxzXCIsIGFzeW5jICgpID0+IHtcclxuICAgICAgICAgICAgLy8gQXJyYW5nZVxyXG4gICAgICAgICAgICBjb25zdCBkZXBlbmRlbmNpZXMgPSBjcmVhdGVTdHViRGVwZW5kZW5jaWVzKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGNsYXNzSW5zdGFuY2VGYWN0b3J5ID0gbmV3IENsYXNzSW5zdGFuY2VGYWN0b3J5KGRlcGVuZGVuY2llcyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlbGF0aXZlUGF0aCA9IFwiZGlyL2ZpbGVcIjtcclxuXHJcbiAgICAgICAgICAgIC8vIEFjdFxyXG4gICAgICAgICAgICBjb25zdCBmaXJzdCA9IGF3YWl0IGNsYXNzSW5zdGFuY2VGYWN0b3J5LmdldENsYXNzSW5zdGFuY2UocmVsYXRpdmVQYXRoLCBzdHViQ2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgY29uc3Qgc2Vjb25kID0gYXdhaXQgY2xhc3NJbnN0YW5jZUZhY3RvcnkuZ2V0Q2xhc3NJbnN0YW5jZShyZWxhdGl2ZVBhdGgsIHN0dWJDbGFzc05hbWUpO1xyXG5cclxuICAgICAgICAgICAgLy8gQXNzZXJ0XHJcbiAgICAgICAgICAgIGV4cGVjdChmaXJzdCkudG8uYmUuZXF1YWwoc2Vjb25kKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59KTtcclxuIl19
