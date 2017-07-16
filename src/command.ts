import { IContextChange, IContextTracker } from "./contextTracker";

/**
 * Converts parsed argument commands into GLS.
 *
 * @type TCommandArgs   Args for the command to convert from.
 */
export interface ICommand<TCommandArgs extends {} = {}> {
    /**
     * Renders command arguments into GLS.
     *
     * @param args   Parsed argument commands.
     * @param context   Tracks the command context stack.
     * @returns Lines of GLS or recursive commands.
     */
    render(args: TCommandArgs, context: IContextTracker): IRenderedCommand;
}

/**
 * Result from a command render.
 */
export interface IRenderedCommand {
    /**
     * How this result affects the context stack, if at all.
     */
    contextChange?: IContextChange;

    /**
     * Lines of GLS or recursive commands.
     */
    lines: string[][];
}
