# mocha-allure-example
Example of Selenium tests with Mocha and Allure report

## Setup

1. Install [node.js version 8+](https://nodejs.org/). This project uses modern Javascript features, that will not work in older versions.
2. Clone this repository `git clone git@github.com:allure-examples/mocha-allure-example.git && cd mocha-allure-example`
3. Install dependencies `npm install`
4. Run tests via `npm test`. It will start Selenium server and perform some tests
5. Run `npm run report` to build `html` report from results and it will be
opened in your browser

## Project structure

* **pages/** – directory with page objects. Page object is an convenient way to create reusable actions to interact with page .
* **test/** – test files. Our setup uses [Mocha].
    * **simple.spec.js** – simple test example that uses only pure Allure, without webdriver
    * **webdriver-io.spec.js** – tests with selenium and [webdriver.io], one of the popular libraries
* **util/** - additional helpers
    * **config.js** – configuration file where specified base options for tests. Here you can change target browser or page urls
    * **browser.js** - browser provider for your tests

Also, check out files content, they are also well-commented.

[allure-cli]: https://github.com/allure-framework/allure-cli
[Mocha]: http://mochajs.org
[webdriver.io]: http://webdriver.io/
