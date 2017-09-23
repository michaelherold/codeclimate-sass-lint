/**
 * Handles the conversion of severity levels between sass-lint and CodeClimate.
 *
 * @module severity
 */
module.exports = {
  /**
   * Converts a sass-lint severity level into a CodeClimate severity.
   *
   * @public
   * @param {integer} severity - The sass-lint severity level of a lint.
   * @returns {string} - The CodeClimate severity level.
   */
  toSeverity (severity) {
    switch (severity) {
      case 0:
        return "minor";
      case 1:
        return "major";
      case 2:
        return "blocker";
      default:
        return "info";
    }
  }
};
