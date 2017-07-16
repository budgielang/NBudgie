import { Command } from "./command";
import { MatchersList } from "./matchers";

export const createWhileEnd = () => ({
    command: new Command(),
    matchersList: new MatchersList(),
});
