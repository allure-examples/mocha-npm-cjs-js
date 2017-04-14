# mocha-allure-example
Example of Selenium tests with Mocha and Allure report

## Setup

1. Install [node.js](https://nodejs.org/) and npm
2. Clone this repository `git clone git@github.com:allure-examples/mocha-allure-example.git && cd mocha-allure-example`
3. Install dependencies `npm install`
4. Run tests via `npm test`. It will start Selenium server and perform some tests
5. Run `npm run report` to build `html` report from results and it will be
opened in your browser

## Project structure

* **pages/** – directory with page objects. Page object is a nice shortcut for
reuse selectors of elements on a web page.
* **test/** – test files. Our setup uses [Mocha].
    * **webdriver-io.spec.js** – tests with selenium and [webdriver.io], one of the popular libraries
    * **simple.spec.js** – simple test example with extra features
* **config.js** – configuration file where specified base options for tests
such as testing host address and selenium server address. Defaults can be
overridden via environment variables.

[allure-cli]: https://github.com/allure-framework/allure-cli
[Mocha]: http://mochajs.org
[webdriver.io]: http://webdriver.io/
