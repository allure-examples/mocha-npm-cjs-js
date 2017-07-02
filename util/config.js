const testHost = process.env.testHost || "https://github.com";

// An abstraction on top of our host. Instead of crafting urls directly every time,
// we can call this convenient class:
//
//  const site = new TestSite('http://github.com');
//  site.organization('test') // will return organization URL
//
class TestSite {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  organization(orgName) {
    return `${this.baseUrl}/${orgName}`;
  }

  project(orgName, projectName) {
    return `${this.baseUrl}/${orgName}/${projectName}`;
  }
}

module.exports = {
  // page url builder for our test site
  site: new TestSite(testHost),
  // configuration object for Selenium
  selenium: {
    host: process.env.selenium || "localhost",
    desiredCapabilities: {
      browserName: "firefox"
    }
  }
};
