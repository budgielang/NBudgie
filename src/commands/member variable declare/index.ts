import { Command } from "./command";
import { MatchersList } from "./matchers";

export const createMemberVariableDeclare = () => ({
    command: new Command(),
    matchersList: new MatchersList(),
});
