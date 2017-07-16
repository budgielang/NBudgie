import { ICommand } from "../../command";

export interface ICommandArgs {
    container: string;
    value: string;
    valueType: string;
}

export class Command implements ICommand<ICommandArgs> {
    public render(args: ICommandArgs) {
        const { container, value, valueType } = args;

        return {
            contextChange: {
                enter: "for each start",
            },
            lines: [
                [`for each start : ${container} ${valueType} ${value}`],
            ],
        };
    }
}
