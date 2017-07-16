import { Command } from "./command";
import { MatchersList } from "./matchers";

export const createPrint = () => ({
    command: new Command(),
    matchersList: new MatchersList(),
});
