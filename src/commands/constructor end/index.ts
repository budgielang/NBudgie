import { Command } from "./command";
import { MatchersList } from "./matchers";

export const createConstructorEnd = () => ({
    command: new Command(),
    matchersList: new MatchersList(),
});
