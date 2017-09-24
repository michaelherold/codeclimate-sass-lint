const Fingerprint = require("./fingerprint");
const { categoriesFor } = require("./categories");
const { contentsFor } = require("./contents");
const { remediationPointsFor } = require("./remediation-points");
const { toSeverity } = require("./severity");

/**
 * Handles the mapping from sass-lint lints to CodeClimate issues.
 *
 * @module issue
 */
module.exports = {
  /**
   * Converts a lint into a CodeClimate issue.
   *
   * @public
   * @param {object} lint - The lint from sass-lint, augmented with a path.
   * @return {object}
   */
  toIssue (lint) {
    const fingerprint = new Fingerprint(lint);

    let issue = {
      type: "issue",
      check_name: lint.ruleId,
      description: lint.message,
      content: {
        body: contentsFor(lint.ruleId)
      },
      categories: categoriesFor(lint.ruleId),
      location: {
        path: lint.path,
        positions: {
          begin: {
            line: lint.line,
            column: lint.column
          },
          end: {
            line: lint.line,
            column: lint.column
          }
        }
      },
      remediation_points: remediationPointsFor(lint.ruleId),
      severity: toSeverity(lint.severity)
    };

    if (fingerprint.isFingerprintable()) {
      issue.fingerprint = fingerprint.toString();
    }

    return issue;
  }
};
