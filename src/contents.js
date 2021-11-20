const fs = require("fs");
const path = require("path");

const content = {};
const contentDirectory = path.join(__dirname, "..", "config", "contents");

/**
 * Looks up the contents for the rule and caches them.
 *
 * @private
 * @param {string} rule - The name of the rule to look up.
 * @return {string}
 */
const fetchContents = (rule) => {
  const fileName = path.join(contentDirectory, `${rule}.md`);
  let contents = "";

  if (fs.existsSync(fileName)) {
    contents = fs.readFileSync(fileName).toString();
  }

  content[rule] = contents;

  return contents;
};

/**
 * Handles the lookup of contents for rules.
 *
 * @module contents
 */
module.exports = {
  /**
   * Looks up the contents for a rule from the documentation.
   *
   * @public
   * @param {string} rule - The rule to look up the contents for.
   * @return {string} The Markdown documentation for the rule.
   */
  contentsFor (rule) {
    if (Object.prototype.hasOwnProperty.call(content, rule)) {
      return content[rule];
    } else {
      return fetchContents(rule);
    }
  },

  /**
   * The index of rules that we have looked up in the past.
   *
   * @package
   * @return {object}
   */
  index: content
};
