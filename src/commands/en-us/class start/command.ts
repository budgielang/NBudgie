import { ICommand } from "../../../command";

export interface ICommandArgs {
    classDescriptor: string;
    interfaceName?: string[];
    parentClassDescriptor?: string;
}

export class Command implements ICommand<ICommandArgs> {
    public render(args: ICommandArgs) {
        const classArgs: string[] = [args.classDescriptor];

        if (args.parentClassDescriptor !== undefined) {
            classArgs.push("extends", args.parentClassDescriptor);
        }

        if (args.interfaceName !== undefined) {
            classArgs.push("implements", ...args.interfaceName);
        }

        return {
            contextChange: {
                enter: "class start",
            },
            lines: [
                [`class start : ${classArgs.join(" ")}`],
            ],
        };
    }
}
