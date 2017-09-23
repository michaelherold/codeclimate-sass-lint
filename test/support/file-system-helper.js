const path = require("path");

module.exports = {
  /**
   * Creates a path to a given example file within the current directory.
   *
   * @example
   *   inDirectory(examplesPath("file-list"), () => {
   *     a_path = exampleFile("a.scss");
   *   });
   *
   * @public
   * @param {string} fileName - The name of the example file.
   * @return {string} - The absolute path to the example file.
   */
  exampleFile (fileName) {
    return path.resolve(process.cwd(), fileName);
  },

  /**
   * Creates a path to the given example directory.
   *
   * @example
   *   path = examplesPath("file-list");
   *
   * @public
   * @param {string} directory - The subdirectory within support/examples.
   * @return {string} - The absolute path to the directory.
   */
  examplesPath (directory) {
    return path.resolve(path.join(__dirname, "..", "examples", directory));
  },

  /**
   * Performs a function within the context of a root directory.
   *
   * @example
   *   inDirectory(examplesPath("file-list"), () => {
   *     a_path = exampleFile("a.scss");
   *   });
   *
   * @public
   * @param {string} root - The directory to change to.
   * @param {function} fn - The function to perform
   * @return {void}
   */
  inDirectory (root, fn) {
    const cwd = process.cwd();

    process.chdir(root);
    fn()
    process.chdir(cwd);
  }
};

