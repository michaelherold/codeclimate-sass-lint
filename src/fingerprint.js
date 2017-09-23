const crypto = require("crypto");

/**
 * Encapsulates the logic for fingerprinting a lint.
 */
class Fingerprint {
  /**
   * Instantiantes a new Fingerprint from a lint.
   *
   * @public
   * @param {object} lint - The lint to fingerprint.
   * @returns {Fingerprint}
   */
  constructor (lint) {
    this.path = lint.path;
    this.rule = lint.ruleId;
    this.message = lint.message;
  }

  /**
   * Checks whether the lint is fingerprintable.
   *
   * @public
   * @return {boolean}
   */
  isFingerprintable () {
    return true;
  }

  /**
   * Outputs the fingerprint for the lint.
   *
   * @public
   * @return {string}
   */
  toString () {
    let fingerprint = "";

    if (this.isFingerprintable()) {
      let md5 = crypto.createHash("md5");

      md5.update(this.path);
      md5.update(this.rule);
      md5.update(this.message);

      fingerprint = md5.digest("hex");
    }

    return fingerprint;
  }
}

module.exports = Fingerprint;
