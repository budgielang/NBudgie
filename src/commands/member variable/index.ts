import { Command } from "./command";
import { MatchersList } from "./matchers";

export const createMemberVariable = () => ({
    command: new Command(),
    matchersList: new MatchersList(),
});
