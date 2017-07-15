import { ICommand } from "../../../command";

export interface ICommandArgs {
    end: number;
    name: string;
    start: number;
}

export class Command implements ICommand<ICommandArgs> {
    public render(args: ICommandArgs) {
        const { end, name, start } = args;

        return [
            `for numbers start : ${name} number ${start} ${end}`,
        ];
    }
}
