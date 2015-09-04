# mocha-allure-example
Example of Selenium tests with Mocha and Allure report

## Setup

1. Install [node.js](https://nodejs.org/) and npm
2. Clone this repository `git clone git@github.com:allure-examples/mocha-allure-example.git && cd mocha-allure-example`
3. You need to have Selenium endpoint to run tests. You can use SauceLabs, for example
4. Install dependencies `npm install`
5. Run tests `selenium=<username>:<api-key>@ondemand.saucelabs.com npm test`,
where `username` and `api-key` is your credentials for Selenium server
6. If you want to build report at local machine, install [allure-cli] first
7. Run `npm run report` to build `html` report from results and it will be
opened in your browser

## Project structure

* **pages/** – directory with page objects. Page object is a nice shortcut for
reuse selectors of elements on a web page.
* **test/** – test files. We have test on [Mocha] using two webdriver clients
    * [webdriver.io] – popular promise-based tool
    * [webdriver-http-sync] – synchronous client with more simple code
* **config.js** – configuration file where specified base options for tests
such as testing host address and selenium server address. Defaults can be
overriden via environment variables.

[allure-cli]: https://github.com/allure-framework/allure-cli
[Mocha]: http://mochajs.org
[webdriver.io]: http://webdriver.io/
[webdriver-http-sync]: https://github.com/groupon/webdriver-http-sync
