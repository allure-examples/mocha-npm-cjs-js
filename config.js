module.exports = {
	testHost: process.env.testHost || "https://yandex.ru",
	seleniumHost: process.env.selenium || "localhost",
	capabilities: {
		browserName: "firefox"
	}
};
