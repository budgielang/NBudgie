import * as path from "path";

import { ICommand } from "../command";
import { IMatcher } from "../matchers";
import { Parser } from "../parser";
import { IClassInstanceFactory } from "./classInstanceFactory";

/**
 * Dependencies to initialize a new instance of the CommandsAndMatchersFactory class.
 */
export interface ICommandsAndMatchersFactoryDependencies {
    /**
     * Creates cached instances of classes.
     */
    classInstanceFactory: IClassInstanceFactory;
}

/**
 * Imports commands and their paired matchers.
 */
export interface ICommandsAndMatchersFactory {
    /**
     * Retrieves an instance of a command class.
     *
     * @type TClass   Type of the command class.
     * @param commandName   Name of the command.
     * @returns A Promise for an instance of the command class.
     */
    getCommand<TClass extends ICommand = ICommand>(commandName: string): Promise<ICommand>;

    /**
     * Retrieves an instance of a matcher class.
     *
     * @type TClass   Type of the matcher class.
     * @param matcherName   Name of the matcher.
     * @returns A Promise for an instance of the matcher class.
     */
    getMatcher<TClass extends IMatcher = IMatcher>(matcherName: string): Promise<IMatcher>;
}

/**
 * Imports commands and their paired matchers.
 */
export class CommandsAndMatchersFactory implements ICommandsAndMatchersFactory {
    /**
     * Dependencies used for initialization.
     */
    private readonly dependencies: ICommandsAndMatchersFactoryDependencies;

    /**
     * Initializes a new instance of the CommandsAndMatchersFactory class.
     *
     * @param dependencies   Dependencies to be used for initialization.
     */
    public constructor(dependencies: ICommandsAndMatchersFactoryDependencies) {
        this.dependencies = dependencies;
    }

    /**
     * Retrieves an instance of a command class.
     *
     * @type TClass   Type of the command class.
     * @param commandName   Name of the command.
     * @returns A Promise for an instance of the command class.
     */
    public async getCommand<TClass extends ICommand = ICommand>(commandName: string): Promise<ICommand> {
        return await this.getClassInstance<TClass>(commandName, "command.js", "Command");
    }

    /**
     * Retrieves an instance of a matcher class.
     *
     * @type TClass   Type of the matcher class.
     * @param matcherName   Name of the matcher.
     * @returns A Promise for an instance of the matcher class.
     */
    public async getMatcher<TClass extends IMatcher = IMatcher>(matcherName: string): Promise<IMatcher> {
        return await this.getClassInstance<TClass>(matcherName, "matchers.js", "Matcher");
    }

    /**
     * Retrieves an instance of a class within a command directory.
     *
     * @param commandName   Name of the command.
     * @param fileName   Name of the file without its directory.
     * @param className   Name of the class with the file.
     * @returns A Promise for an instance of the class.
     */
    private async getClassInstance<TClass>(commandName: string, fileName: string, className: string): Promise<TClass> {
        const filePath = path.join(commandName, fileName);

        return await this.dependencies.classInstanceFactory.getClassInstance<TClass>(filePath, className);
    }
}
