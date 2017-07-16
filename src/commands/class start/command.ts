import { ICommand } from "../../command";

export interface ICommandArgs {
    classDescriptor: string;
    extends?: string;
    implements?: string[];
}

export class Command implements ICommand<ICommandArgs> {
    public render(args: ICommandArgs) {
        const classArgs: string[] = [args.classDescriptor];

        if (args.extends !== undefined) {
            classArgs.push("extends", args.extends);
        }

        if (args.implements !== undefined) {
            classArgs.push("implements", ...args.implements);
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
