import { ICommand } from "../../../command";

export class Command implements ICommand<{}> {
    public render() {
        return {
            contextChange: {
                exit: "class end",
            },
            lines: [
                ["class end"],
            ],
        };
    }
}
