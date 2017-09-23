const glob = require("glob");

const pattern = "**/*.s[a|c]ss";

/**
 * Builds a list of excluded files from the engine's exclude paths.
 *
 * @private
 * @param {string} root - The root folder to search for files in.
 * @param {string[]} excludePaths - The path globs to exclude.
 * @return {string[]}
 */
const buildExclusions = (root, excludePaths) => {
  let exclusions = [];

  excludePaths.forEach((path) => {
    exclusions = exclusions.concat(glob.sync(buildSearchTerm(root, path)));
  });

  return exclusions;
};

/**
 * Builds a list of included files from the engine's nclude paths.
 *
 * @private
 * @param {string} root - The root folder to search for files in.
 * @param {string[]} includePaths - The path globs to include.
 * @return {string[]}
 */
const buildInclusions = (root, includePaths) => {
  let result = [];

  includePaths.forEach((path) => {
    result = result.concat(glob.sync(buildSearchTerm(root, path)));
  });

  return result;
};

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
  }
  else {
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
const isSass = (file) => {
  return file.endsWith(".sass") || file.endsWith(".scss");
}

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

    let result = buildInclusions(root, engineConfig.files.include);
    let exclusions = buildExclusions(root, engineConfig.files.ignore);

    const isExcluded = (file) => {
      return exclusions.indexOf(file) !== -1;
    }

    result = result.filter((file) => { return !isExcluded(file) && isSass(file); });

    return result;
  }
};
