import { ICommand } from "../../../command";

export class Command implements ICommand<{}> {
    public render() {
        return {
            contextChange: {
                exit: "if end",
            },
            lines: [
                ["if end"],
            ],
        };
    }
}
