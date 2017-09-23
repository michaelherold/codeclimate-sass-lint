const fs = require("fs");
const deepMerge = require("deepmerge");

/**
 * The default configuration for the engine.
 *
 * @private
 * @return {object}
 **/
const defaultEngineConfig = {
  config: {
    file: null
  },
  enabled: true,
  exclude_paths: [],
  include_paths: ["./"],
  rules: {}
};

/**
 * Combines two configuration objects
 *
 * @private
 * @param {object} first - The first object.
 * @param {object} second - The second object.
 * @return {object} The combined object.
 */
const combine = (first, second) => {
  let engineConfig = Object.assign({}, first);

  engineConfig = deepMerge(engineConfig, second);

  if (engineConfig.include_paths.length > 1) {
    engineConfig.include_paths.shift();
  }

  return engineConfig;
};

/**
 * Converts the config.json file format into sass-lint style.
 *
 * @private
 * @param {object} config - The config.json styles configuration.
 * @return {object} The sass-lint style configuration.
 */
const toSassLintConfig = (engineConfig) => {
  const sassLintConfig = {
    config: engineConfig.config.file,
    enabled: engineConfig.enabled,
    files: {
      ignore: engineConfig.exclude_paths,
      include: engineConfig.include_paths
    },
    rules: engineConfig.rules
  };

  return sassLintConfig;
};

/**
 * Handles the CodeClimate config.json format and converts it for sass-lint.
 * @module config
 */
module.exports = {
  /**
   * Constructs a configuration object from a given JSON file.
   *
   * @public
   * @param {string} file - The path to the configuration file.
   * @return {object} The configuration file merged with the defaultEngineConfig.
   */
  fromFile (file = "/config.json") {
    let engineConfig = Object.assign({}, defaultEngineConfig);

    if (fs.existsSync(file)) {
      const extraConfig = JSON.parse(fs.readFileSync(file));

      engineConfig = combine(engineConfig, extraConfig);
    }

    return toSassLintConfig(engineConfig);
  },

  /**
   * Constructs a configuration object from a given object.
   *
   * @public
   * @param {object} config - The object to use when constructing the configuration.
   * @return {object} The config object merged with the defaultEngineConfig.
   */
  fromObject (config = {}) {
    let engineConfig = Object.assign({}, defaultEngineConfig);

    engineConfig = combine(engineConfig, config);

    return toSassLintConfig(engineConfig);
  }
};
