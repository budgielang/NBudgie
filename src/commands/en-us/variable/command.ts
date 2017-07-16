import { ICommand } from "../../../command";

export interface ICommandArgs {
    name: string;
    type: string;
    value?: string;
}

export class Command implements ICommand<ICommandArgs> {
    public render(args: ICommandArgs) {
        const { name, type, value } = args;

        let output = `variable : ${name} ${type}`;
        if (value !== undefined) {
            output += ` ${value}`;
        }

        return {
            lines: [
                [output],
            ],
        };
    }
}
