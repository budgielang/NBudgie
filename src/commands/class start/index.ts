import { Command } from "./command";
import { MatchersList } from "./matchers";

export const createClassStart = () => ({
    command: new Command(),
    matchersList: new MatchersList(),
});
