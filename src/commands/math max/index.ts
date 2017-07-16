import { Command } from "./command";
import { MatchersList } from "./matchers";

export const createMathMax = () => ({
    command: new Command(),
    matchersList: new MatchersList(),
});
