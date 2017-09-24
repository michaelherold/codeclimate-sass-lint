/**
 * Contains tools for measuring and improving performance.
 *
 * @module performance
 */
module.exports = {
  /**
   * Measures the time it takes to perform a function for performance debugging.
   *
   * @public
   * @param {string} name - The name of the action being performed.
   * @param {function} fn - The action to perform.
   * @return {object} The result of the function call.
   */
  withTiming (name, fn) {
    const start = new Date();
    const result = fn();

    if (global.debug) {
      const duration = (new Date() - start) / 1000;
      console.error(`sass-lint.timing.${name}: ${duration}s`);
    }

    return result;
  }
};
