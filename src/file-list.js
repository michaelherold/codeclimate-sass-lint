const glob = require("glob");

const pattern = "**/*.s[a|c]ss";

/**
 * Constructs a blog search term for a path.
 *
 * @private
 * @param {string} root - The root folder to search for files in.
 * @param {string} path - The path glob to search for.
 * @return {string}
 */
const buildSearchTerm = (root, path) => {
  let searchTerm;

  if (path.slice(-1) === "/") {
    searchTerm = `${root}/${path}${pattern}`;
  } else {
    searchTerm = `${root}/${path}`;
  }

  return searchTerm;
};

/**
 * Checks whether a file is a Sass file.
 *
 * @private
 * @param {string} file - The filename to inspect.
 * @return {boolean}
 */
const isSass = file => file.endsWith(".sass") || file.endsWith(".scss");

/**
 * Builds a list of files from a list of path globs.
 *
 * @private
 * @param {string} root - The root folder to search for files in.
 * @param {string[]} paths - The path globs to include.
 * @return {string[]}
 */
const searchPaths = (root, paths) => {
  let results = [];

  paths.forEach(path => results = results.concat(glob.sync(buildSearchTerm(root, path))));

  return results;
};

/**
 * Handles the construction of lists of files to analyze.
 *
 * @module file-list
 */
module.exports = {
  /**
   * Builds a list of files for the engine to analyze.
   *
   * @public
   * @param {string} root - The root folder to search for files in.
   * @param {object} engineConfig - The engine configuration.
   * @return {string[]} A list of files to analyze.
   */
  filesToInspect (root, engineConfig) {
    if (Object.keys(engineConfig).length === 0) {
      return glob.sync(`${root}/${pattern}`);
    }

    let result = searchPaths(root, engineConfig.include_paths);
    let exclusions = searchPaths(root, engineConfig.exclude_paths);
    const isExcluded = file => exclusions.indexOf(file) !== -1;

    result = result.filter(file => !isExcluded(file) && isSass(file));

    return result;
  }
};
