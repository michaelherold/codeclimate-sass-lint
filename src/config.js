const fs = require("fs");

const defaults = {
  config: null,
  enabled: true,
  excludePaths: [],
  includePaths: ["./"],
};

/**
 * Constructs a configuration object from a given JSON file.
 *
 * @public
 * @param {string} file - The path to the configuration file.
 * @return {object} The configuration file merged with the defaults.
 */
const fromFile = (file = "/config.json") => {
  let config = defaults;

  if (fs.existsSync(file)) {
    const extraConfig = JSON.parse(fs.readFileSync(file))

    config = merge(config, extraConfig);
  }

  return toLinterConfig(config);
};

/**
 * Constructs a configuration object from a given object.
 *
 * @public
 * @param {object} config - The object to use when constructing the configuration.
 * @return {object} The config object merged with the defaults.
 */
const fromObject = (config = {}) => {
  return toLinterConfig(merge(defaults, config));
};

/**
 * Merges two configuration objects together, favoring the new content.
 *
 * @private
 * @param {object} base - The base object to use as a default.
 * @param {object} extras - The new configuration to merge into the base.
 * @return {object} The configuration object after the merge.
 */
const merge = (base, extras) => {
  const merged = Object.assign({}, base);

  for (key in extras) {
    if (extras.hasOwnProperty(key) && defaults.hasOwnProperty(key)) {
      merged[key] = extras[key];
    }
  }

  return merged;
};

/**
 * Converts the config.json file format into sass-lint style.
 *
 * @private
 * @param {object} config - The config.json styles configuration.
 * @return {object} The sass-lint style configuration.
 */
const toLinterConfig = (config) => {
  const linterConfig = {
    config: config.config,
    files: {
      ignore: config.excludePaths
    },
  };

  return linterConfig;
};

module.exports = {
  fromFile,
  fromObject
};
