import { APIRequestContext } from '@playwright/test';
import type {FullResult, Reporter, TestCase, TestResult} from '@playwright/test/reporter';
import axios from 'axios';
  
  class TelegramReporter implements Reporter {
    
   
    async onTestEnd(test: TestCase, result: TestResult) {
        console.log(`The test finished ${test.title}: ${result.status}`);
        const response = await axios.get(`https://api.telegram.org/bot6085237023:AAHAgm7JldCCECT4jNUYy-D_DGGStQ78v6o/sendMessage?chat_id=-10019602628508&text= ${test.title}:  ${result.status}`);

      }
    
  }

  
  export default TelegramReporter;