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
     * @returns The equivalent GLS, if possible.
     */
    public async parseLine(line: string): Promise<string[] | undefined> {
        for (const commandName of this.dependencies.commandNames) {
            const matcher = await this.dependencies.commandsAndMatchersFactory.getMatcher(commandName);
            const match = matcher.expression.exec(line);
            if (match === null) { // tslint:disable-line:no-null-keyword
                continue;
            }

            const command = await this.dependencies.commandsAndMatchersFactory.getCommand(commandName);

            return command.render(matcher.parseArgs(match));
        }
    }
}
