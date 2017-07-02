"use strict";
// Page objects example. They are convenient way to reuse selectors to elements on a web page, and also
// provide some common actions that can be done on the page.

// Page object for Github organization page
function OrganizationPage(browser) {
  // Simple property to find a repository item in the list
  this.repositiory = `#org-repositories .repo-list [itemprop="name codeRepository"]`;
  // Dynamic builder for getting an item in pagination by page index
  this.pageByIndex = index => `.pagination [href$="page=${index}"]`;

  // Select page action. Whenever called, clicks on page. Note that `{0}` will be replaced
  // with actual page index in the report
  this.selectPage = allure.createStep("select page #{0}", index => {
    return browser.click(this.pageByIndex(index));
  });
  // Repositories count action. Looks for repositories items at the page, returns their count
  this.repositoriesCount = allure.createStep("count repositories", async () => {
    const { value } = await browser.elements(this.repositiory);
    return value.length;
  });
}

// Page object for Github project page
function ProjectPage(browser) {
  this.readme = "#readme";
  this.fileByName = name => `.files .js-navigation-item [href$="${name}"]`;
  this.fileContent = ".file";

  this.selectFile = allure.createStep("select file '{0}'", name => {
    return browser.click(this.fileByName(name));
  });
}

module.exports = {
  OrganizationPage,
  ProjectPage
};
