/* eslint-disable @typescript-eslint/no-var-requires */
require("dotenv/config");
global.self = global;
// global.window = {};
global.XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
global.Headers = undefined;
global.Request = undefined;
global.Response = undefined;
