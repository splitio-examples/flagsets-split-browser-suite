// This implementation of the singleton pattern ensures that only one instance of the
// SplitFactory client is created on the web client. This means that only one copy of
// the Split (feature flag and segment) definitions are downloaded and synchronized.

const { Timer } = require('./../utils/timer');
let client;

/**
 * Create (instantiate) a SplitSuite (Split SDK) client. The client is used to track events and evaluate feature flags.
 *
 * NOTE: This method creates a single instance (singleton) of the Split SDK client.
 *
 * @function getSplitClientForFlagset
 * 
 * @param {string} flagSetName
 * The name of the flag set already associated with feature flags in Split cloud (this can be done in Split UI).
 * If provided, the flag set name is used to filter the flags synchronized from Split cloud, resulting in a smaller payload.
 * 
 * @returns {SplitIO.IClient} 
 * The singleton instance of the ISuiteSDK.client()
 */
async function getSplitClient(flagSetName = '') {

    const trafficType = process.env.TRAFFIC_TYPE;

    if (!client) {

        // Dynamically import a local module, which in turn imports '@splitsoftware/browser-split-suite' for tree-shaking, resulting in a smaller app
        const { SplitSuite /*, DebugLogger*/ } = await import('./browser-split-suite');

        let config = {
            core: {
                authorizationKey: process.env.CLIENT_SIDE_SDK_KEY,
            
                // In this example, we get the user key from URL query parameter `id`
                key: new URLSearchParams(window.location.search).get('id'),
                // Specifying the traffic type for the user key is optional, the value is 'user' by default
                trafficType: trafficType

            },
            //debug: DebugLogger()
        };

        if(flagSetName !== ''){
            config.sync = {
                splitFilters: [{
                    type: 'bySet',
                    values: [flagSetName]
                }]
            };
        }

        const timer = Timer();

        client = SplitSuite(config).client();
        client.on(client.Event.SDK_READY, function() {

            // send latency (SDK initialization time, including time downloading Split definitions) to Split cloud as a custom event
            client.track(trafficType, `splitsdk.${ client.Event.SDK_READY.replaceAll('::', '_') }`, timer.duration());

            console.log(`Split SDK initialized in ${timer.duration()} ms`)
        });
        
        return await client;

    } else {

        return client;
    }
}

module.exports = { getSplitClient };