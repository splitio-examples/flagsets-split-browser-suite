// This implementation of the singleton pattern ensures that only one instance of the
// SplitFactory client is created on the web client. This means that only one copy of
// the Split (feature flag and segment) definitions are downloaded and synchronized.

require('dotenv').config();
const { SplitFactory } = require('@splitsoftware/splitio');

// the SDK client singleton instance
let client;


/**
 * Create (instantiate) a Split SDK client. The client is used to track events and evaluate feature flags.
 *
 * NOTE: This method creates a single instance (singleton) of the Split SDK client.
 *
 * @function getSplitClient
 * @returns {SplitIO.IAsyncClient} The singleton instance of the SplitFactory.client()
 */
function getSplitClient() {

  if (!client) {
    client = SplitFactory({
      core: {
        authorizationKey: process.env.SERVER_SIDE_SDK_KEY,
        trafficType: process.env.TRAFFIC_TYPE   // optional, 'user' by default
      },
      debug: 'INFO'
    }).client();
  }

  return client;
}

module.exports = getSplitClient;