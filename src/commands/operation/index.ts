import { Command } from "./command";
import { MatchersList } from "./matchers";

export const createOperation = () => ({
    command: new Command(),
    matchersList: new MatchersList(),
});
