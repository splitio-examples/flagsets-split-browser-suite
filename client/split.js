/**
 * This creates a Split client for evaluating feature flags as well as internally creating a RUM agent.
 * The RUM agent has the webVitals event collector registered by default, so it will send web page
 * performance metrics to Split. You can view these metrics in Data hub of the Split UI.
 * For more information about webVitals, @see {@link https://help.split.io/hc/en-us/articles/360030898431-Browser-RUM-agent#web-vitals}.
 */
export function setupSplitOnPage(SplitSuite)
{
  const client = SplitSuite({
    core: {
      authorizationKey: process.env.CLIENT_SIDE_SDK_KEY,
  
      // In this example, we get the user key from URL query parameter `id`
      key: new URLSearchParams(window.location.search).get('id'),
      // Specifying the traffic type for the user key is optional, the value is 'user' by default
      trafficType: 'user'
    }
  }).client();

  client.on(client.Event.SDK_READY, function() {
    
    let imageSize = client.getTreatment(process.env.FEATURE_FLAG_IMAGE_SIZE);

    // if the query parameter is not one of the the imgur size modifiers, then don't use it
    if( ! ['b', 's', 't', 'm', 'l', 'h'].includes(imageSize) ) imageSize = '';

    document.getElementById('street_img').src = "https://i.imgur.com/q9b5x97" + imageSize + ".png";
  });
}