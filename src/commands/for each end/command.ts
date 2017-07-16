import { ICommand } from "../../command";

export class Command implements ICommand<{}> {
    public render() {
        return {
            contextChange: {
                exit: "for each end",
            },
            lines: [
                ["for each end"],
            ],
        };
    }
}
