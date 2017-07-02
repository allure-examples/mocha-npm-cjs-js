const testHost = process.env.testHost || "https://github.com";

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
  testHost,
  site: new TestSite(testHost),
  selenium: {
    host: process.env.selenium || "localhost",
    desiredCapabilities: {
      browserName: "firefox"
    }
  }
};
