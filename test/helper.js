global.expect = require("chai").expect;

const path = require("path");

require("app-module-path").addPath(path.join(__dirname, "..", "src"));
