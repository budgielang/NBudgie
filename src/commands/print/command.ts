import { ICommand } from "../../command";

export interface ICommandArgs {
    message: string;
}

export class Command implements ICommand<ICommandArgs> {
    public render(args: ICommandArgs) {
        let { message } = args;

        if (message.indexOf(" ") !== -1) {
            message = `(${message})`;
        }

        return {
            lines: [
                [`print : ${message}`],
            ],
        };
    }
}
