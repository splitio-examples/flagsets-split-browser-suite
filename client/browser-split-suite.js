// The following imports are not recommended, because they don't let bundlers, like Webpack and Rollup, trim unused code from the final bundle:
// - `import * as SplitSuiteModule from '@splitsoftware/browser-suite';`
// - `const { SplitSuite } = require('@splitsoftware/browser-suite');`

export { SplitSuite, DebugLogger } from '@splitsoftware/browser-suite';     // Split Browser SDK Suite (a client-side SDK)
