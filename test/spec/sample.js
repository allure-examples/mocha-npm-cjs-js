const { it } = require("mocha")
const { label, link, issue, tms, step, attachment } = require("allure-js-commons");

it("sample test", async () => {
  await label("foo", "bar");
  await link("https://allurereport.org", "custom", "Allure Web-Site");
  await issue("https://allurereport.org/fake-issue/1", "Issue 1");
  await issue("2", "Issue 2");
  await tms("https://allurereport.org/fake-task/1", "Task 1");
  await tms("2", "Task 2");
  await attachment("Sample text attachment", "Hello world!", "text/plain");
  await step("step 1", async () => {
    await step("step 1.1", async () => {
      await step("step 1.1.1", async () => {
        await attachment("Sample text attachment for step", "Goodbye world!", "text/plain");
      });
    });
  });
});
