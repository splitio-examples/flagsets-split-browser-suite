const getSplitClientForFlagset = require('./split.js');

const splitClient = getSplitClientForFlagset('clientside');
console.log(`client is ${splitClient}`);
splitClient.ready().finally(() => {

  console.log(`do we have ff name? ${process.env.FEATURE_FLAG_IMAGE_SIZE}`);

  let imageSize = splitClient.getTreatment(process.env.FEATURE_FLAG_IMAGE_SIZE);
    
  // if the imageSize value is not one of the the imgur size modifiers, then don't use it
  if( ! ['b', 's', 't', 'm', 'l', 'h'].includes(imageSize) ) imageSize = '';

  document.getElementById('street_img').src = "https://i.imgur.com/q9b5x97" + imageSize + ".png";

});
