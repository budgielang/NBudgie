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
const fs = require("fs");
const minimatch = require("minimatch");
require("mocha");
const path = require("path");
const createParser_1 = require("../lib/createParser");
/**
 * Test runner for comparing converted .gls files and expected output.
 */
class ComparisonTestsRunner {
    /**
     * Initializes a new instance of the ComparisonTestsRunner class.
     *
     * @param section   Friendly directory path to read tests under.
     * @param commandsToRun   Command groups to run, if not all.
     */
    constructor(section, commandsToRun = new Set(["*"])) {
        const rootDirectory = path.join(__dirname, "../lib/commands");
        this.section = section;
        this.commandsToRun = commandsToRun;
        this.rootPath = path.resolve(section);
        this.commandTests = readTestsUnderPath(this.rootPath, this.commandsToRun);
        this.parser = createParser_1.createParser();
    }
    /**
     * Runs tests under the directory path.
     */
    run() {
        describe(this.section, () => {
            this.commandTests.forEach((tests, command) => {
                it(command, () => __awaiter(this, void 0, void 0, function* () { return yield this.runCommandTest(command); }));
            });
        });
    }
    /**
     * Runs a test for a single command in a language.
     *
     * @param command   A GLS command to be tested, such as "ArrayInitialize".
     * @param test   A test to be run for the command, such as "no values".
     * @param language   The language the test is running as.
     */
    runCommandTest(command) {
        return __awaiter(this, void 0, void 0, function* () {
            const source = this.readCommandFile(command, "source.txt");
            const expected = this.readCommandFile(command, "expected.gls");
            const actual = yield this.parser.parseLines(source);
            chai_1.expect(actual).to.be.deep.equal(expected);
        });
    }
    /**
     * Reads the code contents of a test file.
     *
     * @param command   The command this file is under.
     * @param name   The name of the file.
     * @returns   Lines of code in the file.
     */
    readCommandFile(command, name) {
        const filePath = path.resolve(this.rootPath, command, name);
        const lines = fs.readFileSync(filePath).toString().replace(/\r/g, "").split("\n");
        return lines.slice(lines.indexOf("-") + 1, lines.lastIndexOf("-"));
    }
}
exports.ComparisonTestsRunner = ComparisonTestsRunner;
/**
 * Retrieves, for each command in a directory, tests under that command.
 *
 * @param rootPath   An absolute path to a command's tests folder.
 * @param commandsToRun   Command groups to run, if not all.
 * @returns Tests for each command in a directory.
 */
const readTestsUnderPath = (rootPath, commandsToRun) => {
    const tests = new Map();
    let childrenNames = fs.readdirSync(rootPath);
    if (commandsToRun !== undefined) {
        const commandMatchers = Array.from(commandsToRun.keys());
        childrenNames = childrenNames
            .filter((childName) => commandMatchers.some((commandMatcher) => minimatch(childName, commandMatcher, {
            nocase: true,
        })));
    }
    for (const childName of childrenNames) {
        tests.set(childName, fs.readdirSync(path.resolve(rootPath, childName))
            .filter((testFileName) => testFileName.indexOf(".gls") !== -1)
            .map((testFileName) => testFileName.substring(0, testFileName.indexOf(".gls"))));
    }
    return tests;
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvY29tcGFyaXNvblRlc3RzUnVubmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSwrQkFBOEI7QUFDOUIseUJBQXlCO0FBQ3pCLHVDQUF1QztBQUN2QyxpQkFBZTtBQUNmLDZCQUE2QjtBQUU3QixzREFBbUQ7QUFHbkQ7O0dBRUc7QUFDSDtJQTBCSTs7Ozs7T0FLRztJQUNILFlBQW1CLE9BQWUsRUFBRSxnQkFBNkIsSUFBSSxHQUFHLENBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNuRixNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1FBQzlELElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1FBQ25DLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsWUFBWSxHQUFHLGtCQUFrQixDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzFFLElBQUksQ0FBQyxNQUFNLEdBQUcsMkJBQVksRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUFFRDs7T0FFRztJQUNJLEdBQUc7UUFDTixRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNuQixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQWUsRUFBRSxPQUFlO2dCQUN2RCxFQUFFLENBQUMsT0FBTyxFQUFFLHFEQUFZLE1BQU0sQ0FBTixNQUFNLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUEsR0FBQSxDQUFDLENBQUM7WUFDaEUsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDVSxjQUFjLENBQUMsT0FBZTs7WUFDdkMsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDLENBQUM7WUFDM0QsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsY0FBYyxDQUFDLENBQUM7WUFDL0QsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUVwRCxhQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzlDLENBQUM7S0FBQTtJQUVEOzs7Ozs7T0FNRztJQUNLLGVBQWUsQ0FBQyxPQUFlLEVBQUUsSUFBWTtRQUNqRCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzVELE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFbEYsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsS0FBSyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7Q0FFSjtBQWpGRCxzREFpRkM7QUFFRDs7Ozs7O0dBTUc7QUFDSCxNQUFNLGtCQUFrQixHQUFHLENBQUMsUUFBZ0IsRUFBRSxhQUEwQjtJQUNwRSxNQUFNLEtBQUssR0FBRyxJQUFJLEdBQUcsRUFBb0IsQ0FBQztJQUMxQyxJQUFJLGFBQWEsR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBRTdDLEVBQUUsQ0FBQyxDQUFDLGFBQWEsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQzlCLE1BQU0sZUFBZSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFDekQsYUFBYSxHQUFHLGFBQWE7YUFDeEIsTUFBTSxDQUNILENBQUMsU0FBUyxLQUFLLGVBQWUsQ0FBQyxJQUFJLENBQy9CLENBQUMsY0FBYyxLQUFLLFNBQVMsQ0FBQyxTQUFTLEVBQUUsY0FBYyxFQUFFO1lBQ3JELE1BQU0sRUFBRSxJQUFJO1NBQ2YsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNyQixDQUFDO0lBRUQsR0FBRyxDQUFDLENBQUMsTUFBTSxTQUFTLElBQUksYUFBYSxDQUFDLENBQUMsQ0FBQztRQUNwQyxLQUFLLENBQUMsR0FBRyxDQUNMLFNBQVMsRUFDVCxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO2FBQzVDLE1BQU0sQ0FBQyxDQUFDLFlBQVksS0FBSyxZQUFZLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2FBQzdELEdBQUcsQ0FBQyxDQUFDLFlBQVksS0FBSyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxZQUFZLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzdGLENBQUM7SUFFRCxNQUFNLENBQUMsS0FBSyxDQUFDO0FBQ2pCLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L2NvbXBhcmlzb25UZXN0c1J1bm5lci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGV4cGVjdCB9IGZyb20gXCJjaGFpXCI7XHJcbmltcG9ydCAqIGFzIGZzIGZyb20gXCJmc1wiO1xyXG5pbXBvcnQgKiBhcyBtaW5pbWF0Y2ggZnJvbSBcIm1pbmltYXRjaFwiO1xyXG5pbXBvcnQgXCJtb2NoYVwiO1xyXG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gXCJwYXRoXCI7XHJcblxyXG5pbXBvcnQgeyBjcmVhdGVQYXJzZXIgfSBmcm9tIFwiLi4vbGliL2NyZWF0ZVBhcnNlclwiO1xyXG5pbXBvcnQgeyBQYXJzZXIgfSBmcm9tIFwiLi4vbGliL3BhcnNlclwiO1xyXG5cclxuLyoqXHJcbiAqIFRlc3QgcnVubmVyIGZvciBjb21wYXJpbmcgY29udmVydGVkIC5nbHMgZmlsZXMgYW5kIGV4cGVjdGVkIG91dHB1dC5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBDb21wYXJpc29uVGVzdHNSdW5uZXIge1xyXG4gICAgLyoqXHJcbiAgICAgKiBNaW5pbWF0Y2hlcnMgZm9yIGNvbW1hbmQgZ3JvdXBzIHRvIHJ1bi5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBjb21tYW5kc1RvUnVuOiBTZXQ8c3RyaW5nPjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbW1hbmQgdGVzdHMgdG8gYmUgcnVuIHdpdGhpbiB0aGUgc2VjdGlvbi5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBjb21tYW5kVGVzdHM6IE1hcDxzdHJpbmcsIHN0cmluZ1tdPjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFBhcnNlcyByYXcgc3RyaW5nIGxpbmVzIGludG8gR0xTLlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHBhcnNlcjogUGFyc2VyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGlzayByb290IHBhdGggZm9yIHRoZSBzZWN0aW9uLlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHJvb3RQYXRoOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGcmllbmRseSBkaXJlY3RvcnkgcGF0aCB0byByZWFkIHRlc3RzIHVuZGVyLlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHNlY3Rpb246IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIEluaXRpYWxpemVzIGEgbmV3IGluc3RhbmNlIG9mIHRoZSBDb21wYXJpc29uVGVzdHNSdW5uZXIgY2xhc3MuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHNlY3Rpb24gICBGcmllbmRseSBkaXJlY3RvcnkgcGF0aCB0byByZWFkIHRlc3RzIHVuZGVyLlxyXG4gICAgICogQHBhcmFtIGNvbW1hbmRzVG9SdW4gICBDb21tYW5kIGdyb3VwcyB0byBydW4sIGlmIG5vdCBhbGwuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihzZWN0aW9uOiBzdHJpbmcsIGNvbW1hbmRzVG9SdW46IFNldDxzdHJpbmc+ID0gbmV3IFNldDxzdHJpbmc+KFtcIipcIl0pKSB7XHJcbiAgICAgICAgY29uc3Qgcm9vdERpcmVjdG9yeSA9IHBhdGguam9pbihfX2Rpcm5hbWUsIFwiLi4vbGliL2NvbW1hbmRzXCIpO1xyXG4gICAgICAgIHRoaXMuc2VjdGlvbiA9IHNlY3Rpb247XHJcbiAgICAgICAgdGhpcy5jb21tYW5kc1RvUnVuID0gY29tbWFuZHNUb1J1bjtcclxuICAgICAgICB0aGlzLnJvb3RQYXRoID0gcGF0aC5yZXNvbHZlKHNlY3Rpb24pO1xyXG4gICAgICAgIHRoaXMuY29tbWFuZFRlc3RzID0gcmVhZFRlc3RzVW5kZXJQYXRoKHRoaXMucm9vdFBhdGgsIHRoaXMuY29tbWFuZHNUb1J1bik7XHJcbiAgICAgICAgdGhpcy5wYXJzZXIgPSBjcmVhdGVQYXJzZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJ1bnMgdGVzdHMgdW5kZXIgdGhlIGRpcmVjdG9yeSBwYXRoLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcnVuKCk6IHZvaWQge1xyXG4gICAgICAgIGRlc2NyaWJlKHRoaXMuc2VjdGlvbiwgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNvbW1hbmRUZXN0cy5mb3JFYWNoKCh0ZXN0czogc3RyaW5nW10sIGNvbW1hbmQ6IHN0cmluZyk6IHZvaWQgPT4ge1xyXG4gICAgICAgICAgICAgICAgaXQoY29tbWFuZCwgYXN5bmMgKCkgPT4gYXdhaXQgdGhpcy5ydW5Db21tYW5kVGVzdChjb21tYW5kKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUnVucyBhIHRlc3QgZm9yIGEgc2luZ2xlIGNvbW1hbmQgaW4gYSBsYW5ndWFnZS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gY29tbWFuZCAgIEEgR0xTIGNvbW1hbmQgdG8gYmUgdGVzdGVkLCBzdWNoIGFzIFwiQXJyYXlJbml0aWFsaXplXCIuXHJcbiAgICAgKiBAcGFyYW0gdGVzdCAgIEEgdGVzdCB0byBiZSBydW4gZm9yIHRoZSBjb21tYW5kLCBzdWNoIGFzIFwibm8gdmFsdWVzXCIuXHJcbiAgICAgKiBAcGFyYW0gbGFuZ3VhZ2UgICBUaGUgbGFuZ3VhZ2UgdGhlIHRlc3QgaXMgcnVubmluZyBhcy5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGFzeW5jIHJ1bkNvbW1hbmRUZXN0KGNvbW1hbmQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGNvbnN0IHNvdXJjZSA9IHRoaXMucmVhZENvbW1hbmRGaWxlKGNvbW1hbmQsIFwic291cmNlLnR4dFwiKTtcclxuICAgICAgICBjb25zdCBleHBlY3RlZCA9IHRoaXMucmVhZENvbW1hbmRGaWxlKGNvbW1hbmQsIFwiZXhwZWN0ZWQuZ2xzXCIpO1xyXG4gICAgICAgIGNvbnN0IGFjdHVhbCA9IGF3YWl0IHRoaXMucGFyc2VyLnBhcnNlTGluZXMoc291cmNlKTtcclxuXHJcbiAgICAgICAgZXhwZWN0KGFjdHVhbCkudG8uYmUuZGVlcC5lcXVhbChleHBlY3RlZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWFkcyB0aGUgY29kZSBjb250ZW50cyBvZiBhIHRlc3QgZmlsZS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gY29tbWFuZCAgIFRoZSBjb21tYW5kIHRoaXMgZmlsZSBpcyB1bmRlci5cclxuICAgICAqIEBwYXJhbSBuYW1lICAgVGhlIG5hbWUgb2YgdGhlIGZpbGUuXHJcbiAgICAgKiBAcmV0dXJucyAgIExpbmVzIG9mIGNvZGUgaW4gdGhlIGZpbGUuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVhZENvbW1hbmRGaWxlKGNvbW1hbmQ6IHN0cmluZywgbmFtZTogc3RyaW5nKTogc3RyaW5nW10ge1xyXG4gICAgICAgIGNvbnN0IGZpbGVQYXRoID0gcGF0aC5yZXNvbHZlKHRoaXMucm9vdFBhdGgsIGNvbW1hbmQsIG5hbWUpO1xyXG4gICAgICAgIGNvbnN0IGxpbmVzID0gZnMucmVhZEZpbGVTeW5jKGZpbGVQYXRoKS50b1N0cmluZygpLnJlcGxhY2UoL1xcci9nLCBcIlwiKS5zcGxpdChcIlxcblwiKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGxpbmVzLnNsaWNlKGxpbmVzLmluZGV4T2YoXCItXCIpICsgMSwgbGluZXMubGFzdEluZGV4T2YoXCItXCIpKTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXRyaWV2ZXMsIGZvciBlYWNoIGNvbW1hbmQgaW4gYSBkaXJlY3RvcnksIHRlc3RzIHVuZGVyIHRoYXQgY29tbWFuZC5cclxuICpcclxuICogQHBhcmFtIHJvb3RQYXRoICAgQW4gYWJzb2x1dGUgcGF0aCB0byBhIGNvbW1hbmQncyB0ZXN0cyBmb2xkZXIuXHJcbiAqIEBwYXJhbSBjb21tYW5kc1RvUnVuICAgQ29tbWFuZCBncm91cHMgdG8gcnVuLCBpZiBub3QgYWxsLlxyXG4gKiBAcmV0dXJucyBUZXN0cyBmb3IgZWFjaCBjb21tYW5kIGluIGEgZGlyZWN0b3J5LlxyXG4gKi9cclxuY29uc3QgcmVhZFRlc3RzVW5kZXJQYXRoID0gKHJvb3RQYXRoOiBzdHJpbmcsIGNvbW1hbmRzVG9SdW46IFNldDxzdHJpbmc+KTogTWFwPHN0cmluZywgc3RyaW5nW10+ID0+IHtcclxuICAgIGNvbnN0IHRlc3RzID0gbmV3IE1hcDxzdHJpbmcsIHN0cmluZ1tdPigpO1xyXG4gICAgbGV0IGNoaWxkcmVuTmFtZXMgPSBmcy5yZWFkZGlyU3luYyhyb290UGF0aCk7XHJcblxyXG4gICAgaWYgKGNvbW1hbmRzVG9SdW4gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGNvbnN0IGNvbW1hbmRNYXRjaGVycyA9IEFycmF5LmZyb20oY29tbWFuZHNUb1J1bi5rZXlzKCkpO1xyXG4gICAgICAgIGNoaWxkcmVuTmFtZXMgPSBjaGlsZHJlbk5hbWVzXHJcbiAgICAgICAgICAgIC5maWx0ZXIoXHJcbiAgICAgICAgICAgICAgICAoY2hpbGROYW1lKSA9PiBjb21tYW5kTWF0Y2hlcnMuc29tZShcclxuICAgICAgICAgICAgICAgICAgICAoY29tbWFuZE1hdGNoZXIpID0+IG1pbmltYXRjaChjaGlsZE5hbWUsIGNvbW1hbmRNYXRjaGVyLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vY2FzZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICB9KSkpO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAoY29uc3QgY2hpbGROYW1lIG9mIGNoaWxkcmVuTmFtZXMpIHtcclxuICAgICAgICB0ZXN0cy5zZXQoXHJcbiAgICAgICAgICAgIGNoaWxkTmFtZSxcclxuICAgICAgICAgICAgZnMucmVhZGRpclN5bmMocGF0aC5yZXNvbHZlKHJvb3RQYXRoLCBjaGlsZE5hbWUpKVxyXG4gICAgICAgICAgICAgICAgLmZpbHRlcigodGVzdEZpbGVOYW1lKSA9PiB0ZXN0RmlsZU5hbWUuaW5kZXhPZihcIi5nbHNcIikgIT09IC0xKVxyXG4gICAgICAgICAgICAgICAgLm1hcCgodGVzdEZpbGVOYW1lKSA9PiB0ZXN0RmlsZU5hbWUuc3Vic3RyaW5nKDAsIHRlc3RGaWxlTmFtZS5pbmRleE9mKFwiLmdsc1wiKSkpKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGVzdHM7XHJcbn07XHJcbiJdfQ==
