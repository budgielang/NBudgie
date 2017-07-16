import { ICommand } from "../../command";

export class Command implements ICommand<{}> {
    public render() {
        return {
            contextChange: {
                exit: "constructor start",
            },
            lines: [
                ["constructor end"],
            ],
        };
    }
}
