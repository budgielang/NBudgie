import { ICommand } from "../../command";

export class Command implements ICommand<{}> {
    public render() {
        return {
            contextChange: {
                exit: "while end",
            },
            lines: [
                ["while end"],
            ],
        };
    }
}
