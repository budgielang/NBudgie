import { expect } from "chai";
import * as fs from "fs";
import * as minimatch from "minimatch";
import "mocha";
import * as path from "path";

import { ClassInstanceFactory } from "../lib/factories/classInstanceFactory";
import { CommandsAndMatchersFactory } from "../lib/factories/commandsAndMatchersFactory";
import { Parser } from "../lib/parser";

/**
 * Test runner for comparing converted .gls files and expected output.
 */
export class ComparisonTestsRunner {
    /**
     * Minimatchers for command groups to run.
     */
    private readonly commandsToRun: Set<string>;

    /**
     * Command tests to be run within the section.
     */
    private readonly commandTests: Map<string, string[]>;

    /**
     * Parses raw string lines into GLS.
     */
    private readonly parser: Parser;

    /**
     * Disk root path for the section.
     */
    private readonly rootPath: string;

    /**
     * Friendly directory path to read tests under.
     */
    private readonly section: string;

    /**
     * Initializes a new instance of the ComparisonTestsRunner class.
     *
     * @param section   Friendly directory path to read tests under.
     * @param commandsToRun   Command groups to run, if not all.
     */
    public constructor(section: string, commandsToRun: Set<string> = new Set<string>(["*"])) {
        const rootDirectory = path.join(__dirname, "../lib/commands/en-us");
        this.section = section;
        this.commandsToRun = commandsToRun;
        this.rootPath = path.resolve(section);
        this.commandTests = readTestsUnderPath(this.rootPath, this.commandsToRun);
        this.parser = new Parser({
            commandNames: fs.readdirSync(rootDirectory),
            commandsAndMatchersFactory: new CommandsAndMatchersFactory({
                classInstanceFactory: new ClassInstanceFactory({
                    importFile: (filePath: string) => Promise.resolve(require((filePath))),
                    rootDirectory,
                }),
            }),
        });
    }

    /**
     * Runs tests under the directory path.
     */
    public run(): void {
        describe(this.section, () => {
            this.commandTests.forEach((tests: string[], command: string): void => {
                it(command, async () => await this.runCommandTest(command));
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
    public async runCommandTest(command: string): Promise<void> {
        const source = this.readCommandFile(command, "source.txt");
        const expected = this.readCommandFile(command, "expected.gls");
        const actual = await this.parser.parseLines(source);

        expect(actual).to.be.deep.equal(expected);
    }

    /**
     * Reads the code contents of a test file.
     *
     * @param command   The command this file is under.
     * @param name   The name of the file.
     * @returns   Lines of code in the file.
     */
    private readCommandFile(command: string, name: string): string[] {
        const filePath = path.resolve(this.rootPath, command, name);
        const lines = fs.readFileSync(filePath).toString().replace(/\r/g, "").split("\n");

        return lines.slice(lines.indexOf("-") + 1, lines.lastIndexOf("-"));
    }

}

/**
 * Retrieves, for each command in a directory, tests under that command.
 *
 * @param rootPath   An absolute path to a command's tests folder.
 * @param commandsToRun   Command groups to run, if not all.
 * @returns Tests for each command in a directory.
 */
const readTestsUnderPath = (rootPath: string, commandsToRun: Set<string>): Map<string, string[]> => {
    const tests = new Map<string, string[]>();
    let childrenNames = fs.readdirSync(rootPath);

    if (commandsToRun !== undefined) {
        const commandMatchers = Array.from(commandsToRun.keys());
        childrenNames = childrenNames
            .filter(
                (childName) => commandMatchers.some(
                    (commandMatcher) => minimatch(childName, commandMatcher, {
                        nocase: true,
                    })));
    }

    for (const childName of childrenNames) {
        tests.set(
            childName,
            fs.readdirSync(path.resolve(rootPath, childName))
                .filter((testFileName) => testFileName.indexOf(".gls") !== -1)
                .map((testFileName) => testFileName.substring(0, testFileName.indexOf(".gls"))));
    }

    return tests;
};
