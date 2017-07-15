import * as path from "path";

import { ICommand } from "../command";
import { IMatchersList } from "../matchers";
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
     * Retrieves an instance of a matchers list class.
     *
     * @type TClass   Type of the matchers list class.
     * @param matcherName   Name of the matchers list.
     * @returns A Promise for an instance of the matchers list class.
     */
    getMatchersList<TClass extends IMatchersList = IMatchersList>(matcherName: string): Promise<IMatchersList>;
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
     * Retrieves an instance of a matchers list class.
     *
     * @type TClass   Type of the matchers list class.
     * @param matcherName   Name of the matchers list.
     * @returns A Promise for an instance of the matchers list class.
     */
    public async getMatchersList<TClass extends IMatchersList = IMatchersList>(matcherName: string): Promise<IMatchersList> {
        return await this.getClassInstance<TClass>(matcherName, "matchers.js", "MatchersList");
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
