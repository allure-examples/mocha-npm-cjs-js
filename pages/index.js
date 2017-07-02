"use strict";

function OrganizationPage(browser) {
  this.repositiory = `#org-repositories .repo-list [itemprop="name codeRepository"]`;
  this.pageByIndex = index => `.pagination [href$="page=${index}"]`;

  this.selectPage = allure.createStep("select page #{0}", index => {
    return browser.click(this.pageByIndex(index));
  });
  this.repositoriesCount = allure.createStep("count repositories", async () => {
    const { value } = await browser.elements(this.repositiory);
    return value.length;
  });
}

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
