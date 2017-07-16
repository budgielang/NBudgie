import { Command } from "./command";
import { MatchersList } from "./matchers";

export const createMathMin = () => ({
    command: new Command(),
    matchersList: new MatchersList(),
});
