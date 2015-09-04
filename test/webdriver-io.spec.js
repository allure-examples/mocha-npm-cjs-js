"use strict";
/*global allure*/
var webdriverio = require("webdriverio");
var config = require("../config");
var mainPage = require("../pages/main");

function convertToAssertion(e) {
    e.name = "AssertionError";
    throw e;
}

describe("webdriverio spec", function() {
    var webdriver, setQuery;
    function screenshot(name) {
        return webdriver.screenshot().then(function(res) {
            allure.createAttachment(name, function() {
                return new Buffer(res.value, "base64");
            }, "image/png")();
        });
    }

    beforeEach(function() {
        webdriver = webdriverio.remote({
            desiredCapabilities: config.capabilities,
            host: config.seleniumHost
        });
        return webdriver.init().url(config.testHost);
    });

    beforeEach(function() {
        setQuery = allure.createStep("type search query '{0}'", function(query) {
            return webdriver.setValue(mainPage.search.input, query);
        });
    });

    it("should open page", function() {
        return webdriver.waitForVisible(mainPage.search.input);
    });

    it("should show suggest", function() {
        return setQuery("allure-frame").waitForVisible(mainPage.suggest.selector, 3000)
            .catch(convertToAssertion);
    });

    it("should open search result page", function() {
        return setQuery("allure-framework").click(mainPage.search.submitButton)
            .waitUntil(function() {
                return this.getTitle().then(function(title) {
                    return title.indexOf("allure-framework") === 0;
                });
            }, 3000)
            .catch(convertToAssertion);
    });

    it("this is a failing test for example purposes", function() {
        return webdriver.waitForVisible(".non-existing-element");
    });

    afterEach("take screenshot on failure", function() {
        if(this.currentTest.state !== "passed") {
            return screenshot("screenshot on fail");
        }
    });

    afterEach(function() {
        return webdriver.end();
    });

});
