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
 * @function getSplitClient
 * @returns {SplitIO.IClient} The singleton instance of the ISuiteSDK.client()
 */
async function getSplitClient() {
    console.log("calling getSplitClient()");
    return await getSplitClientForFlagset();
}

/**
 * Create (instantiate) a SplitSuite (Split SDK) client. The client is used to track events and evaluate feature flags.
 *
 * NOTE: This method creates a single instance (singleton) of the Split SDK client.
 *
 * @function getSplitClientForFlagset
 * 
 * @param {string} flagsetname
 * The name of the flag set already associated with feature flags in Split cloud (this can be done in Split UI).
 * If provided, the flag set name is used to filter the flags synchronized from Split cloud, resulting in a smaller payload.
 * 
 * @returns {SplitIO.IClient} 
 * The singleton instance of the ISuiteSDK.client()
 */
async function getSplitClientForFlagset(flagsetname = '') {

    console.log(`flagset name is ${flagsetname}`);

    const trafficType = process.env.TRAFFIC_TYPE;

    if (!client) {

        console.log("NEW CLIENT");

        // Dynamically import a local module, which in turn imports '@splitsoftware/browser-split-suite' for tree-shaking, resulting in a smaller app
        const { SplitSuite, DebugLogger } = await import('./browser-split-suite');

        let config = {
            core: {
                authorizationKey: process.env.CLIENT_SIDE_SDK_KEY,
            
                // In this example, we get the user key from URL query parameter `id`
                key: new URLSearchParams(window.location.search).get('id'),
                // Specifying the traffic type for the user key is optional, the value is 'user' by default
                trafficType: trafficType
            },
            debug: DebugLogger()
        };

        if(flagsetname !== ''){
            config.sync = {
                splitFilters: [{
                    type: 'bySet',
                    values: [flagsetname]
                }]
            };
        }
        const timer = Timer();
        client = SplitSuite(config).client();
        console.log(`have client: ${client}`);
    
        client.on(client.Event.SDK_READY, function() {
            console.log( "2e. track SDK_READY event: ", client.track(trafficType, `splitsdk.${ client.Event.SDK_READY.replaceAll('::', '_') }`, timer.duration()) );
            console.log( `time is ${timer.duration()}` );
        });
    
        console.log(`returning client: ${client}`);
        return await client;

    } else {

        console.log('returning already-defined client (not sure if it should be within a promise)');
        return client;
    }
}

module.exports = { getSplitClient, getSplitClientForFlagset };