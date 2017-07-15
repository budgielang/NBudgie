import * as path from "path";

/**
 * Initializes a new instance of a class.
 *
 * @type TClass   Type of the class.
 */
interface IClassCreator<TClass> {
    new(): TClass;
}

/**
 * Cached instances of a class.
 */
interface IClassInstances {
    [i: string]: {};
}

/**
 * A class file's exported members.
 *
 * @type TClass   Type of the class.
 * @type TClassName   Name of the class in the file.
 */
interface IFileExports<TClass, TClassName extends string> {
    [i: string /* TClassName */]: IClassCreator<TClass>;
}

/**
 * Dependencies to initialize a new instance of the ClassInstanceFactory class.
 */
export interface IClassInstanceFactoryDependencies {
    /**
     * Root directory to import classes within.
     */
    rootDirectory: string;

    /**
     * Imports a file.
     *
     * @type TFile   Type of the file's exports.
     * @param filePath   Path to the file.
     * @returns A Promise for the file's exports.
     */
    importFile<TFile>(filePath: string): Promise<TFile>;
}

/**
 * Creates cached instances of classes.
 */
export interface IClassInstanceFactory {
    /**
     * Retrieves an instance of a class.
     *
     * @param relativePath   Relative path to the containing file.
     * @param className   Name of the class from the file.
     * @returns An instance of the class.
     */
    getClassInstance<TClass>(relativePath: string, className: string): Promise<TClass>;
}

/**
 * Creates cached instances of classes.
 */
export class ClassInstanceFactory implements IClassInstanceFactory {
    /**
     * Cached instances of classes.
     */
    private readonly classes: IClassInstances = {};

    /**
     * Dependencies used for initialization.
     */
    private readonly dependencies: IClassInstanceFactoryDependencies;

    /**
     * Initializes a new instance of the ClassInstanceFactory class.
     *
     * @param dependencies   Dependencies to be used for initialization.
     */
    public constructor(dependencies: IClassInstanceFactoryDependencies) {
        this.dependencies = dependencies;
    }

    /**
     * Retrieves an instance of a class from its file.
     *
     * @param relativePath   Relative path to the containing file.
     * @param className   Name of the class from the file.
     * @returns An instance of the class.
     */
    public async getClassInstance<TClass>(relativePath: string, className: string): Promise<TClass> {
        const identifier = `${relativePath}::${className}`;

        if (this.classes[identifier] === undefined) {
            this.classes[identifier] = await this.createClassInstance<TClass>(relativePath, className);
        }

        return this.classes[identifier] as TClass;
    }

    /**
     * Retrieves an a class from its file and creates a new instance.
     *
     * @param relativePath   Relative path to the containing file.
     * @param className   Name of the class from the file.
     * @returns An instance of the class.
     */
    private async createClassInstance<TClass>(relativePath: string, className: string) {
        const absolutePath = path.join(this.dependencies.rootDirectory, relativePath);
        const fileExports = await this.dependencies.importFile<IFileExports<TClass, typeof className>>(absolutePath);
        const classCreator = fileExports[className];

        return new classCreator();
    }
}
