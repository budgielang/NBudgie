import { Command } from "./command";
import { MatchersList } from "./matchers";

export const createForEachEnd = () => ({
    command: new Command(),
    matchersList: new MatchersList(),
});
