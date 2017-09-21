/* eslint-disable no-unused-vars */

let configPath = "/config.json";
let codeDir;
let debug = false;
let options = {
  extensions: [".sass", ".scss"],
  ignore: true,
  reset: false
};

const run = (console, runOptions = {}) => {
  const STDOUT = console.log;
  console.log = console.error;

  codeDir = runOptions.dir;
  if (runOptions.configPath) { configPath = runOptions.configPath; }
};

module.exports = { run };
