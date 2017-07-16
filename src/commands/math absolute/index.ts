import { Command } from "./command";
import { MatchersList } from "./matchers";

export const createMathAbsolute = () => ({
    command: new Command(),
    matchersList: new MatchersList(),
});
