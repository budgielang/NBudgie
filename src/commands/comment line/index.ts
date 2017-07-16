import { Command } from "./command";
import { MatchersList } from "./matchers";

export const createCommentLine = () => ({
    command: new Command(),
    matchersList: new MatchersList(),
});
