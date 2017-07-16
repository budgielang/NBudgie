import { Command } from "./command";
import { MatchersList } from "./matchers";

export const createForNumbersStart = () => ({
    command: new Command(),
    matchersList: new MatchersList(),
});
