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
     * @returns Lines of GLS or recursive commands.
     */
    render(args: TCommandArgs): string[][];
}
