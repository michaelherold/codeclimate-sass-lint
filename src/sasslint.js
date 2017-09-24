const { analyzeFiles } = require("./analysis");
const { filesToInspect } = require("./file-list");
const { fromFile } = require("./config");
const { withTiming } = require("./performance");
const { reportIssuesForFile } = require("./reporting");

global.debug = false;

let configPath = "/config.json";

const run = (options = {}) => {
  if (options.configPath) { configPath = options.configPath; }
  if (options.debug) { global.debug = true; }

  const engineConfig = withTiming("engineConfig", () => fromFile(configPath));
  if (!global.debug && engineConfig.debug) { global.debug = true; }

  let files = withTiming("buildFileList", () => filesToInspect(options.dir, engineConfig));
  let lints = withTiming("analyze", () => analyzeFiles(files, engineConfig));

  withTiming("report", () => lints.forEach(reportIssuesForFile));
};

/**
 * Defines the sass-lint CodeClimate engine.
 *
 * @module sasslint
 */
module.exports = {
  /**
   * Runs the engine with the given options.
   *
   * @public
   * @param {object} options - The options that configure the engine for the run.
   * @return {void}
   */
  run (options) {
    withTiming("run", () => run(options));
  }
};
