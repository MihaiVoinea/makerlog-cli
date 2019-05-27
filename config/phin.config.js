const p = require("phin");
const store = require("./store.config");

let options = {
	parse: "json",
	core: {
		headers: {
			"Content-Type": "application/json"
		}
	}
};

if (store.has("token"))
	options.core.headers.Authorization = "Token " + store.get("token");

module.exports = p.defaults(options);
