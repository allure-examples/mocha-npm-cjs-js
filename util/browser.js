const webdriverio = require("webdriverio");
const config = require("./config");

// Helper function to provide browser object for our test cases. Usage
//
//  desribeWithBrowser(
//   'name'
//  )
//
module.exports = function describeWithBrowser(name, callback, body) {
  let browser;
  describe(name, () => {
    // as we using beforeEach here, new browser will be received for every test case
    beforeEach(async () => {
      browser = webdriverio.remote(config.selenium);
      await browser.init();
      callback(browser);
    });

    body();

    // we should shut down browser when we don't need it anymore, in order to avoid
    // dead sessions. Always ensure that you are ending your session in the test end!
    afterEach(() => {
      return browser.end();
    });
  });
};
