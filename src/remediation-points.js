const BASELINE = 50000;

/**
 * Handles the calculation of remediation points for issues.
 *
 * @module remediation-points
 */
module.exports = {
  /**
   * Calculates the remediation points for a rule.
   *
   * @public
   * @param {string} _rule - The name of the rule to calculate from.
   * @return {integer}
   */
  remediationPointsFor (_rule) {
    return BASELINE;
  }
};
