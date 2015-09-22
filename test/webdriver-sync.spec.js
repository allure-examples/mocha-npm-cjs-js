"use strict";
/*global allure*/
var WebDriver = require("webdriver-http-sync");
var chai = require("chai");
chai.use(require("dirty-chai"));
chai.use(require("chai-string"));

var expect = chai.expect;
var config = require("../config");
var mainPage = require("../pages/main");

describe("webdriver-http-sync spec", function() {
    var webdriver;
    var screenshot, setQuery;

    beforeEach(function() {
        var seleniumUrl = "http://" + config.seleniumHost + ":4444/wd/hub";
        webdriver = new WebDriver(seleniumUrl, config.capabilities);
        webdriver.navigateTo(config.testHost);
    });

    beforeEach(function() {
        setQuery = allure.createStep("type search query '{0}'", function(query) {
            var input = webdriver.getElement(mainPage.search.input);
            input.type(query);
        });
        screenshot = allure.createStep("save", function(name) {
            allure.createAttachment(name, new Buffer(webdriver.getScreenshot(), "base64"));
        });
    });

    it("should open page", function() {
        expect(webdriver.getElement(mainPage.search.input).isVisible()).to.be.ok();
    });

    it("should show suggest", function() {
        allure.feature('suggest');
        allure.story('show');
        setQuery("allure-frame");
        expect(webdriver.getElement(mainPage.suggest.selector).isVisible()).to.be.ok();
        expect(webdriver.getElements(mainPage.suggest.items)).to.have.length.of.at.least(1);
    });

    it("should open search result page", function() {
        setQuery("allure-framework");
        webdriver.getElement(mainPage.search.submitButton).click();
        expect(webdriver.getPageTitle()).to.startsWith("allure-framework");
    });

    it("failing test", function() {
        allure.feature('fail');
        allure.description('this test should be failed for example purposes');
        expect(webdriver.getElement(".non-existing-element").isVisible()).to.be.ok();
    });

    xit("a pending test case", function() {
        // example how allure shows skipped tests
    });

    afterEach("take screenshot on failure", function() {
        if(this.currentTest.state !== "passed") {
            return screenshot("screenshot on fail");
        }
    });

    afterEach(function() {
        webdriver.close();
    });

});
