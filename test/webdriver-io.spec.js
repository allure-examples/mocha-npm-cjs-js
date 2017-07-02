"use strict";
const { expect } = require("chai");
const config = require("../util/config");
const describeWithBrowser = require("../util/browser");
const { OrganizationPage, ProjectPage } = require("../pages");
let browser;

describeWithBrowser(
  "webdriver test demo",
  b => (browser = b),
  () => {
    const screenshot = allure.createStep("saveScreenshot", async name => {
      const res = await browser.screenshot();
      allure.createAttachment(name, new Buffer(res.value, "base64"));
    });

    describe("organization", () => {
      let page;
      beforeEach(async () => {
        const pageUrl = config.site.organization("webdriverio");
        page = new OrganizationPage(browser);
        await browser.url(pageUrl);
        allure.addArgument("pageUrl", pageUrl);
      });

      it("first page", async () => {
        await browser.waitForVisible(page.repositiory);
        const count = await page.repositoriesCount();
        expect(count).to.equal(30);
      });

      it("pagination", async () => {
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
        await screenshot("file content");
      });

      it("failing test", () => {
        allure.feature("fail");
        allure.description("this test should be failed for example purposes");
        return browser.waitForVisible(".non-existing-element");
      });
    });

    afterEach("take screenshot on failure", function() {
      if (this.currentTest.state !== "passed") {
        return screenshot("screenshot on fail");
      }
    });
  }
);
