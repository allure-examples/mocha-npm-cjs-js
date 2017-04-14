var expect = require('chai').expect;

describe('simple test suite', function() {
  var testStep, stepToBreak;

  before(function() {
    testStep = allure.createStep('initial', function() {
      // do something
    });

    stepToBreak = allure.createStep('break test', function() {
      throw new Error('Make test broken');
    });
  })


  it('simple passed test', function() {
    testStep();
  });

  it('test with step', function() {
    testStep();
    stepToBreak();
  });

  it('failed test', function() {
    expect(false).to.equal(true);
  });
});
