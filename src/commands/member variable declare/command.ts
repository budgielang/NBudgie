import { ICommand } from "../../command";

export interface ICommandArgs {
    name: string;
    privacy: string;
    type: string;
}

export class Command implements ICommand<ICommandArgs> {
    public render(args: ICommandArgs) {
        const { name, privacy, type } = args;

        return {
            lines: [
                [`member variable declare : ${privacy} ${name} ${type}`],
            ],
        };
    }
}
