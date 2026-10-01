const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://testautomationu.applitools.com',

    // timeouts tuned for a heavy page with an embedded video
    defaultCommandTimeout: 15000,
    pageLoadTimeout: 60000,
    responseTimeout: 30000,

    // prevent the renderer crash from YouTube's embed
    numTestsKeptInMemory: 0,
    experimentalMemoryManagement: true,

    // allow cy.origin to reach youtube.com
    chromeWebSecurity: false,

    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.family === 'chromium' && browser.name !== 'electron') {
          // makes YouTube's iframe autoplay without a gesture
          launchOptions.args.push('--autoplay-policy=no-user-gesture-required');
          // lets cy.origin talk to youtube.com
          launchOptions.args.push('--disable-features=IsolateOrigins,site-per-process');
          launchOptions.args.push('--disable-site-isolation-trials');
        }
        return launchOptions;
      });
    },
  },
});