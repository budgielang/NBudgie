import { ComparisonTestsRunner } from "./comparisonTestsRunner";

const integrationTests = new ComparisonTestsRunner("test/integration");
integrationTests.run();
