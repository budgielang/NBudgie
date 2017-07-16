import { Command } from "./command";
import { MatchersList } from "./matchers";

export const createMathFloor = () => ({
    command: new Command(),
    matchersList: new MatchersList(),
});
