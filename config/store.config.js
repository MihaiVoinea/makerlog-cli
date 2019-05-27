const configStore = require("configstore");
const packageJson = require("../package.json");

// Create a Configstore instance
module.exports = new configStore(packageJson.name);
