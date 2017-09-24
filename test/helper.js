const chai = require("chai");
const sinonChai = require("sinon-chai");

chai.use(sinonChai);
global.expect = chai.expect;

const path = require("path");

require("app-module-path").addPath(path.join(__dirname, "..", "src"));
