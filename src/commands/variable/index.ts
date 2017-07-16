import { Command } from "./command";
import { MatchersList } from "./matchers";

export const createVariable = () => ({
    command: new Command(),
    matchersList: new MatchersList(),
});
