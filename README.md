The example consists of an A/B test comparing the performance of two variants of a webpage. A NodeJS server serves these variants behind a feature flag using Split's NodeJS SDK. The webpages are built with Webpack and utilize Split Browser Suite (and internally Split RUM Agent) to capture performance metrics such as page load time and Web Vitals.

One of the webpage variants (treatment 'on') includes filtering by **flag set** to optimize performance, while the other (treatment 'off') doesn't. Both variants load Split Suite using dynamic imports and are built with Webpack's "production" mode, which minifies the code.

An automation script navigates the page multiple times, generating events and impressions for both treatments.

# How to run

This example assumes you have set up feature flags in Split UI, with traffic type 'user'. You should supply the names of these feature flags in your `.env` file.

1. Take a copy of `.env.example` and re-name to `.env`.
2. Add your Split SDK keys and feature flag names to `.env`. (Defaults will be used for any flags that are not created in Split UI or named in the `.env` file.)
3. Run `npm install` to install dependencies.
4. Run `npm run serve` to build the app and start the server. The Web page will be served at `http://localhost:3000/?id=<user-id>`, where `<user-id>` is a unique identifier for the user, used by the Split SDK to bucket the user into a treatment (one of the outcomes defined in each feature flag).
5. Run `npm run automation` to run the automation script. The script can take some time to complete, as it will generate events and impressions by navigating to the webpage multiple times with different user IDs, using [Puppeteer and Chrome](https://www.npmjs.com/package/puppeteer). You can grab a coffee. :)
6. Open the Split UI, click on a feature flag's Metrics impact tab, and analyze the metric results. You can click 'View more' on a Metric card to visualize metric measurements. See more about the ["Metrics impact tab"](https://help.split.io/hc/en-us/articles/360020844451-Metrics-impact-tab).

![Split UI](./screenshot.png)

# Contents

- `/client`: source code of the web application and its two variants.
  - `/client/index-on.js`: entry point for the optimized variant, served for treatment `on` of the feature flag identified by `FEATURE_FLAG_OPTIMIZE_PAGE`.
  - `/client/index-off.js`: entry point for the default variant, served for treatment `off` of the feature flag identified by `FEATURE_FLAG_OPTIMIZE_PAGE`.
- `/webpack.config.js`: Webpack configuration to build the two variants of the application.
- `/dist`: built static assets of the application, generated by Webpack.
- `/server/index.js`: source code of the NodeJS server that implements the endpoint `GET /?id=<user-id>` that serves the two variants of the application behind a feature flag.
- `/automation.js`: automation script to run Puppeteer, navigate to the application and generate events and impressions.

# Script

- `npm run dev`: starts Webpack with watch flag and NodeJS server with Nodemon, so that the application is rebuilt and the server restarted on file changes in the `/client` and `/server` folders respectively, for development purposes.
- `npm run build`: builds the two variants of the application.
- `npm run serve`: builds the two variants of the application and starts the NodeJS server.
- `npm run automation`: runs the automation script.

# Tutorial - Split flag sets - Filtering feature flags for optimized webpage performance

If you'd like to get a taste of the performance improvements possible with flag sets, see the [blog](https://www.split.io/blog/): 'Throw off webpage latency with Split flag sets'. Since you are already peering into the code, check it out and see Split's webpage optimization capabilities in action!
