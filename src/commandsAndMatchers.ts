import { ICommand } from "./command";
import { IMatchersList } from "./matchers";

export interface ICommandsAndMatchers {
    [i: string]: ICommandAndMatchers;
}

export interface ICommandAndMatchers<TCommandArgs extends {} = {}> {
    command: ICommand<TCommandArgs>;
    matchersList: IMatchersList<TCommandArgs>;
}
