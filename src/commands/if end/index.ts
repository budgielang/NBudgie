import { Command } from "./command";
import { MatchersList } from "./matchers";

export const createIfEnd = () => ({
    command: new Command(),
    matchersList: new MatchersList(),
});
