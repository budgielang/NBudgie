import { lstat, readdir } from "mz/fs";
import * as path from "path";

import { ParserFactory } from "./factories/parserFactory";

export const createParserFactory = async () =>
    new ParserFactory({
        importFile: (filePath: string) => import(filePath),
        readDirectoryFiles: async (directoryPath: string): Promise<string[]> => {
            const children = await readdir(directoryPath);
            const directories = [];

            for (const child of children) {
                const stats = await lstat(child);

                if (stats.isDirectory()) {
                    directories.push(child);
                }
            }

            return directories;
        },
        rootDirectory: path.join(__dirname, "commands", "en-us"),
    });
