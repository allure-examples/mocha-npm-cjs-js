const webdriverio = require("webdriverio");
const config = require("./config");

module.exports = function describeWithBrowser(name, callback, body) {
  let browser;
  describe(name, () => {
    beforeEach(async () => {
      browser = webdriverio.remote(config.selenium);
      await browser.init();
      callback(browser);
    });

    body();

    afterEach(() => {
      return browser.end();
    });
  });
};
