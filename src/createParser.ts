import { createClassEnd } from "./commands/class end";
import { createClassStart } from "./commands/class start";
import { createCommentLine } from "./commands/comment line";
import { createForEachEnd } from "./commands/for each end";
import { createForEachStart } from "./commands/for each start";
import { createForNumbersEnd } from "./commands/for numbers end";
import { createForNumbersStart } from "./commands/for numbers start";
import { createIfEnd } from "./commands/if end";
import { createIfStart } from "./commands/if start";
import { createMathAbsolute } from "./commands/math absolute";
import { createMathFloor } from "./commands/math floor";
import { createMathMax } from "./commands/math max";
import { createMathMin } from "./commands/math min";
import { createMemberVariable } from "./commands/member variable";
import { createMemberVariableDeclare } from "./commands/member variable declare";
import { createOperation } from "./commands/operation";
import { createVariable } from "./commands/variable";
import { createWhileBreak } from "./commands/while break";
import { createWhileEnd } from "./commands/while end";
import { createWhileStart } from "./commands/while start";
import { Parser } from "./parser";

export const createParser = () =>
    new Parser({
        "class end": createClassEnd(),
        "class start": createClassStart(),
        "comment line": createCommentLine(),
        "for each end": createForEachEnd(),
        "for each start": createForEachStart(),
        "for numbers end": createForNumbersEnd(),
        "for numbers start": createForNumbersStart(),
        "if end": createIfEnd(),
        "if start": createIfStart(),
        "math absolute": createMathAbsolute(),
        "math floor": createMathFloor(),
        "math max": createMathMax(),
        "math min": createMathMin(),
        "member variable": createMemberVariable(),
        "member variable declare": createMemberVariableDeclare(),
        "operation": createOperation(),
        "variable": createVariable(),
        "while break": createWhileBreak(),
        "while end": createWhileEnd(),
        "while start": createWhileStart(),
    });
