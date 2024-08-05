import type {FullConfig, FullResult, Reporter, Suite, TestCase, TestResult} from '@playwright/test/reporter';
  
  class MyReporter implements Reporter {
    onBegin(config: FullConfig, suite: Suite) {
      console.log(`Launch the test suit ${suite.allTests().length} tests`);
    }
  
    onTestBegin(test: TestCase, result: TestResult) {
      console.log(`Launch the test ${test.title}`);
    }
  
    onTestEnd(test: TestCase, result: TestResult) {
      console.log(`The test finished ${test.title}: ${result.status}`);
    }
  
    onEnd(result: FullResult) {
      console.log(`The suit finished: ${result.status}`);
    }
  }
  
  export default MyReporter;