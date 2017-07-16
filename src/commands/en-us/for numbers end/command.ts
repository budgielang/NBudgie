import { ICommand } from "../../../command";

export class Command implements ICommand<{}> {
    public render() {
        return {
            contextChange: {
                exit: "for numbers end",
            },
            lines: [
                ["for numbers end"],
            ],
        };
    }
}
