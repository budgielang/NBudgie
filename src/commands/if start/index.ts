import { Command } from "./command";
import { MatchersList } from "./matchers";

export const createIfStart = () => ({
    command: new Command(),
    matchersList: new MatchersList(),
});
