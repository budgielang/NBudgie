import { ICommand } from "../../command";

export interface ICommandArgs {
    left: string;
    right: string;
}

export class Command implements ICommand<ICommandArgs> {
    public render(args: ICommandArgs) {
        const { left, right } = args;

        return {
            lines: [
                [`math max : ${left} ${right}`],
            ],
        };
    }
}
