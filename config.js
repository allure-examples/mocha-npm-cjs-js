module.exports = {
	testHost: process.env.testHost || "https://yandex.ru",
	seleniumHost: process.env.selenium || "ondemand.saucelabs.com",
	capabilities: {
		browserName: "firefox"
	}
};
