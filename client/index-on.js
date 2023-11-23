import { setupSplitOnPage } from './split.js';

/* Dynamically import a local module, which in turn imports '@splitsoftware/browser-rum-agent' for tree-shaking, resulting in a smaller app */
import('./browser-split-suite').then(({ SplitSuite }) => {
  
  setupSplitOnPage(SplitSuite);

}).catch(error => {
  console.log('An error occurred while loading the module: ' + error);
});
