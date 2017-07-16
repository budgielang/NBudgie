import { ICommand } from "../../command";

export interface ICommandArgs {
    item: string;
    operator: string;
    value: string;
}

export class Command implements ICommand<ICommandArgs> {
    public render(args: ICommandArgs) {
        const { item, operator, value } = args;

        return {
            lines: [
                [`operation : ${item} ${operator} ${value}`],
            ],
        };
    }
}
