import { Command } from "./command";
import { MatchersList } from "./matchers";

export const createConstructorStart = () => ({
    command: new Command(),
    matchersList: new MatchersList(),
});
