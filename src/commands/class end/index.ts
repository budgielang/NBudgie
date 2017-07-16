import { Command } from "./command";
import { MatchersList } from "./matchers";

export const createClassEnd = () => ({
    command: new Command(),
    matchersList: new MatchersList(),
});
