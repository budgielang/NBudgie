import { Command } from "./command";
import { MatchersList } from "./matchers";

export const createWhileStart = () => ({
    command: new Command(),
    matchersList: new MatchersList(),
});
