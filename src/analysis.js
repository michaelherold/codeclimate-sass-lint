const sassLint = require("sass-lint");
const { toSassLintConfig } = require("./config");

/**
 * Handles the analysis of Sass files.
 *
 * @module analysis
 */
module.exports = {
  /**
   * Analyzes a list of files with a engine configuration.
   *
   * @public
   * @param {string[]} files - The list of files to analyze.
   * @param {object} engineConfig - The engine configuration.
   * @return {void}
   */
  analyzeFiles (files, engineConfig) {
    return sassLint
      .lintFiles(files.join(", "), toSassLintConfig(engineConfig), engineConfig.config.file);
  }
};
