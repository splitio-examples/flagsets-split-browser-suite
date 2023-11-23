/* Statically import '@splitsoftware/browser-suite' from NPM */
import { SplitSuite } from '@splitsoftware/browser-suite';

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

    // if the imageSize value is not one of the the imgur size modifiers, then don't use it
    if( ! ['b', 's', 't', 'm', 'l', 'h'].includes(imageSize) ) imageSize = '';

    document.getElementById('street_img').src = "https://i.imgur.com/q9b5x97" + imageSize + ".png";
  });
