const { toIssue } = require("./issue");

const toIssueJson = (lint) => {
  return JSON.stringify(toIssue(lint));
};

/**
 * Handles the reporting of Sass lint to CodeClimate.
 *
 * @module reporting
 */
module.exports = {
  /**
   * Reports the issues within a given file.
   *
   * @public
   * @param {object} file - The lint object for a file from sass-lint.
   * @returns {void}
   */
  reportIssuesForFile (file) {
    file
      .messages
      .forEach((message) => {
        const issue = toIssueJson(Object.assign({}, message, {path: file.filePath}));

        console.log(`${issue}\u0000\n`);
      });
  }
};
