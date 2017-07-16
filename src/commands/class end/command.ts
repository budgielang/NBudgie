import { ICommand } from "../../command";

export class Command implements ICommand<{}> {
    public render() {
        return {
            contextChange: {
                exit: "class start",
            },
            lines: [
                ["class end"],
            ],
        };
    }
}
