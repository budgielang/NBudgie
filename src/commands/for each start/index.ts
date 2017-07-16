import { Command } from "./command";
import { MatchersList } from "./matchers";

export const createForEachStart = () => ({
    command: new Command(),
    matchersList: new MatchersList(),
});
