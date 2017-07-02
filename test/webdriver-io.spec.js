"use strict";
// This is an example of webdriver-based test, the most common use-case of Allure report.
// We will be testing some Github pages, perform some simple user scenarios on organization
// page and single project page. No Github account and authorization needed for this test.
const { expect } = require("chai");
const config = require("../util/config");
const describeWithBrowser = require("../util/browser");
const { OrganizationPage, ProjectPage } = require("../pages");
let browser;

// As we don't want to write a code to start browser in every test, we want to create something reusable.
// Here we use a `describeWithBrowser` helper, imported `util/browser.js` file. It enhances standard Mocha
// `describe` function with an extra callback, that injects browser into your code
describeWithBrowser(
  "webdriver test demo",
  // We are using callback approach here. That function will be called with browser object, that we need
  // to save into variable, to make it avaiable to our tests
  b => (browser = b),
  () => {
    // Whenever we will call this function, it will be displayed in the report
    const screenshot = allure.createStep("saveScreenshot", async name => {
      const res = await browser.screenshot();
      // Webdriver.io produces values as base64-encoded string. Allure expects either plain text
      // string or Buffer. So, we are decoding our value, using constructor of built-in Buffer object
      allure.createAttachment(name, new Buffer(res.value, "base64"));
    });

    describe("organization", () => {
      let page;
      beforeEach(async () => {
        const pageUrl = config.site.organization("webdriverio");
        // Instead of hard-coding element selectors here, we are importing them from a shared place
        // See `pages/index.js` file for their implementation
        page = new OrganizationPage(browser);
        await browser.url(pageUrl);
        // We can provide test arugments to report, to better understand the context of each tests.
        // Here we are provding an URL, it will be clickable in report
        allure.addArgument("pageUrl", pageUrl);
      });

      it("first page", async () => {
        // selector is picked up from the page-object
        await browser.waitForVisible(page.repositiory);
        // also page object may contain more complex methods to return some information from page
        const count = await page.repositoriesCount();
        expect(count).to.equal(30);
      });

      it("pagination", async () => {
        // If we want, we can mark test with feature/story labels
        allure.feature("pagination");
        await page.selectPage("2");
        await browser.waitForVisible(page.repositiory, 3000);

        const count = await page.repositoriesCount();
        expect(count).to.be.above(1);
      });
    });

    describe("project", () => {
      let page;
      beforeEach(async () => {
        // Same preparation block as we have had for `organization` suite above.
        // We create page object, open a page, provide its url to report
        const pageUrl = config.site.project("webdriverio", "webdriverio");
        page = new ProjectPage(browser);
        await browser.url(pageUrl);
        allure.addArgument("pageUrl", pageUrl);
      });

      it("page", async () => {
        await browser.waitForVisible(page.readme);
      });

      it("file view", async () => {
        await page.selectFile("index.js");
        await browser.waitForVisible(page.fileContent, 5000);
        await browser.scroll(0, 200);
        // calling step to make a screenshot
        await screenshot("file content");
      });

      // WARN: this test SHOULD fail
      // In order to show an example of test failures in report, we have added a test,
      // that fails in 100% times
      it("failing test", () => {
        allure.feature("fail");
        // If the test name is not enough to desribe your test, you can also provide
        // a desription in this way. Markdown is also supported, if you enable this
        // via second argument
        allure.description(
          "this test should be **failed** for example purposes",
          "markdown"
        );
        return browser.waitForVisible(".non-existing-element");
      });
    });

    // This code will be executed after every test. We can provde extra info to the report,
    // for example a screenshot of test page.
    // In order not to waste time of taking screenshots of valid pages, it makes sense to
    // check test status first and take screenshots only for non-passed tests.
    afterEach("take screenshot on failure", function() {
      if (this.currentTest.state !== "passed") {
        return screenshot("screenshot on fail");
      }
    });
  }
);
