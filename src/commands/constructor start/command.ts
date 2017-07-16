import { ICommand } from "../../command";

export interface ICommandArgs {
    className: string;
}

export class Command implements ICommand<ICommandArgs> {
    public render(args: ICommandArgs) {
        const { className } = args;

        return {
            lines: [
                [`constructor start : ${className}`],
            ],
        };
    }
}
