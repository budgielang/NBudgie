import { ComparisonTestsRunner } from "./comparisonTestsRunner";

const integrationTests = new ComparisonTestsRunner("test/integration/en-us");
integrationTests.run();
