import { ICommand } from "../../command";

export interface ICommandArgs {
    instanceName: string;
    privacy: string;
    variableName: string;
}

export class Command implements ICommand<ICommandArgs> {
    public render(args: ICommandArgs) {
        const { instanceName, privacy, variableName } = args;

        return {
            lines: [
                [`member variable : ${privacy} ${instanceName} ${variableName}`],
            ],
        };
    }
}
