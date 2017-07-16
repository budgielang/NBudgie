import { Command } from "./command";
import { MatchersList } from "./matchers";

export const createWhileBreak = () => ({
    command: new Command(),
    matchersList: new MatchersList(),
});
