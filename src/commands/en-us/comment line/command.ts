import { ICommand } from "../../../command";

export interface ICommandArgs {
    word: string;
}

export class Command implements ICommand<ICommandArgs> {
    public render(args: ICommandArgs) {
        const { word } = args;

        return [
            `comment line : ${word[0].toUpperCase()}${word.slice(1)}`,
        ];
    }
}
