const getSplitClientForFlagset = require('./split.js');

console.log('starting index-on');
(async () => {

  console.log('continuing index-on *');

  const splitClient = await getSplitClientForFlagset('clientside'); // doesn't return from here
  console.log(`client is ${splitClient}`);
  await splitClient.ready();
  console.log('before');
  console.log(`do we have ff name? ${process.env.FEATURE_FLAG_IMAGE_SIZE}`);
  console.log('after');
  let imageSize = splitClient.getTreatment(process.env.FEATURE_FLAG_IMAGE_SIZE);
  console.log(`image size ${imageSize}`);
    
  // if the imageSize value is not one of the the imgur size modifiers, then don't use it
  if( ! ['b', 's', 't', 'm', 'l', 'h'].includes(imageSize) ) imageSize = '';

  document.getElementById('street_img').src = "https://i.imgur.com/q9b5x97" + imageSize + ".png";

  console.log('finishing index-on');
})();

console.log('finished index-on');
