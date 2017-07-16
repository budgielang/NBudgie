import { ICommand } from "../../../command";

export interface ICommandArgs {
    name: string;
}

export class Command implements ICommand<ICommandArgs> {
    public render(args: ICommandArgs) {
        const { name } = args;

        return {
            lines: [
                [`math absolute : ${name}`],
            ],
        };
    }
}
