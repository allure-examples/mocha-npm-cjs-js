const { expect } = require("chai");
// Workaround for https://github.com/allure-framework/allure-mocha/issues/28
// Enforce allure object to be exposed. If you want to use `allure` outside of before/beforeEach
// sections, you will have to import reporter here directly
require("mocha-allure-reporter");

describe("simple test demo", () => {
  const testStep = allure.createStep("initial", () => {
    // do something
  });
  const stepToBreak = allure.createStep("break test", () => {
    throw new Error("Make test broken");
  });

  it("simple passed test", () => {
    testStep();
  });

  it("test with step", () => {
    testStep();
    stepToBreak();
  });

  it("failed test", () => {
    expect(false).to.equal(true);
  });
});
