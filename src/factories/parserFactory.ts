import { Parser } from "../parser";
import { ClassInstanceFactory, IClassInstanceFactoryDependencies } from "./classInstanceFactory";
import { CommandsAndMatchersFactory } from "./commandsAndMatchersFactory";

/**
 * Dependencies to initialize a new instance of the ParserFactory class.
 */
export interface IParserFactoryDependencies extends IClassInstanceFactoryDependencies {
    /**
     * Retrieves file names from a directory.
     *
     * @param directoryPath   Path to a directory.
     * @returns A Promise for files in the directory.
     */
    readDirectoryFiles(directoryPath: string): Promise<string[]>;
}

/**
 * Creates Parser class instances.
 */
export class ParserFactory {
    /**
     * Dependencies used for initialization.
     */
    private readonly dependencies: IParserFactoryDependencies;

    /**
     * Initializes a new instance of the ParserFactory class.
     *
     * @param dependencies   Dependencies to be used for initialization.
     */
    public constructor(dependencies: IParserFactoryDependencies) {
        this.dependencies = dependencies;
    }

    /**
     * @returns A Promise for a Parser for the root directory's commands.
     */
    public async create(): Promise<Parser> {
        const classInstanceFactory = new ClassInstanceFactory(this.dependencies);
        const commandsAndMatchersFactory = new CommandsAndMatchersFactory({ classInstanceFactory });
        const commandNames = await this.dependencies.readDirectoryFiles(this.dependencies.rootDirectory);

        return new Parser({ commandNames, commandsAndMatchersFactory });
    }
}
