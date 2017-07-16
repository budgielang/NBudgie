import { Command } from "./command";
import { MatchersList } from "./matchers";

export const createForNumbersEnd = () => ({
    command: new Command(),
    matchersList: new MatchersList(),
});
