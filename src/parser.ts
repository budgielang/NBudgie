import { ICommand } from "./command";
import { ICommandsAndMatchersFactory } from "./factories/commandsAndMatchersFactory";
import { IMatcher } from "./matchers";

/**
 * Dependencies to initialize a new instance of the Parser class.
 */
export interface IParserDependencies {
    /**
     * Known names of commands.
     */
    commandNames: string[];

    /**
     * Imports commands and their paired matchers by name.
     */
    commandsAndMatchersFactory: ICommandsAndMatchersFactory;
}

/**
 * Parses raw string lines into GLS.
 */
export class Parser {
    /**
     * Imports commands and their paired matchers.
     */
    private readonly dependencies: IParserDependencies;

    /**
     * Initializes a new instance of the Parser class.
     *
     * @param dependencies   Dependencies to be used for initialization.
     */
    public constructor(dependencies: IParserDependencies) {
        this.dependencies = dependencies;
    }

    /**
     * Parses a raw string line into GLS.
     *
     * @param line   A raw string line to convert.
     * @param deep   Whether this is within a recursive command.
     * @returns The equivalent GLS, if possible.
     */
    public async parseLine(line: string, deep?: true): Promise<string[] | undefined> {
        for (const commandName of this.dependencies.commandNames) {
            const matchersList = await this.dependencies.commandsAndMatchersFactory.getMatchersList(commandName);

            for (const matcher of matchersList.matchers) {
                if (deep !== true && matcher.onlyDeep === true) {
                    continue;
                }

                const match = matcher.test.execute(line);
                if (match === undefined) {
                    continue;
                }

                const command = await this.dependencies.commandsAndMatchersFactory.getCommand(commandName);
                const shallowRendered = command.render(matcher.parseArgs(match));

                return await this.recurseIntoCommand(shallowRendered);
            }
        }

        return undefined;
    }

    /**
     * Recursively renders a command.
     *
     * @param shallowRenderedLines   Lines of GLS or recursive commands.
     * @returns A Promise for lines of GLS.
     */
    private async recurseIntoCommand(shallowRenderedLines: string[][]): Promise<string[]> {
        const realRenderedLines: string[] = [];

        for (const shallowLine of shallowRenderedLines) {
            let realLine = "";

            for (const section of shallowLine) {
                if (section[0] === "{") {
                    realLine += `{ ${await this.parseLine(section.slice("{ ".length, section.length - " }".length), true)} }`;
                } else {
                    realLine += section;
                }
            }

            realRenderedLines.push(realLine);
        }

        return realRenderedLines;
    }
}
