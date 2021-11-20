const categories = {
  "attribute-quotes": ["Style"],
  "bem-depth": ["Complexity"],
  "border-zero": ["Style"],
  "brace-style": ["Style"],
  "class-name-format": ["Style"],
  "clean-import-paths": ["Style"],
  "declarations-before-nesting": ["Style"],
  "empty-args": ["Style"],
  "empty-line-between-blocks": ["Style"],
  "extends-before-declarations": ["Style"],
  "extends-before-mixins": ["Style"],
  "final-newline": ["Style"],
  "force-attribute-nesting": ["Style"],
  "force-element-nesting": ["Style"],
  "force-pseudo-nesting": ["Style"],
  "function-name-format": ["Style"],
  "hex-length": ["Style"],
  "hex-notation": ["Style"],
  "id-name-format": ["Style"],
  "indentation": ["Style"],
  "leading-zero": ["Style"],
  "max-file-line-count": ["Complexity"],
  "max-line-length": ["Style"],
  "mixin-name-format": ["Style"],
  "mixins-before-declarations": ["Style"],
  "nesting-depth": ["Complexity"],
  "no-attribute-selectors": ["Style"],
  "no-color-hex": ["Style"],
  "no-color-keywords": ["Style"],
  "no-color-literals": ["Style"],
  "no-combinators": ["Style"],
  "no-css-comments": ["Style"],
  "no-debug": ["Style"],
  "no-disallowed-properties": ["Style"],
  "no-duplicate-properties": ["Style"],
  "no-empty-rulesets": ["Style"],
  "no-extends": ["Style"],
  "no-ids": ["Style"],
  "no-important": ["Style"],
  "no-invalid-hex": ["Style"],
  "no-mergeable-selectors": ["Style"],
  "no-misspelled-properties": ["Style"],
  "no-qualifying-elements": ["Style"],
  "no-trailing-whitespace": ["Style"],
  "no-trailing-zero": ["Style"],
  "no-transition-all": ["Style"],
  "no-universal-selectors": ["Style"],
  "no-url-domains": ["Style"],
  "no-url-protocols": ["Style"],
  "no-vendor-prefixes": ["Style"],
  "no-warn": ["Style"],
  "one-declaration-per-line": ["Style"],
  "placeholder-in-extend": ["Style"],
  "placeholder-name-format": ["Style"],
  "property-sort-order": ["Style"],
  "property-units": ["Style"],
  "pseudo-element": ["Style"],
  "quotes": ["Style"],
  "shorthand-values": ["Style"],
  "single-line-per-selector": ["Style"],
  "space-after-bang": ["Style"],
  "space-after-colon": ["Style"],
  "space-after-comma": ["Style"],
  "space-around-operator": ["Style"],
  "space-before-bang": ["Style"],
  "space-before-brace": ["Style"],
  "space-before-colon": ["Style"],
  "space-between-parens": ["Style"],
  "trailing-semicolon": ["Style"],
  "url-quotes": ["Style"],
  "variable-for-property": ["Style"],
  "variable-name-format": ["Style"],
  "zero-unit": ["Style"]
};

module.exports = {
  /**
   * Looks up the categories for a given rule.
   *
   * @public
   * @param {string} rule - The nae of the rule to lookup.
   * @return {string[]}
   */
  categoriesFor (rule) {
    if (Object.prototype.hasOwnProperty.call(categories, rule)) {
      return categories[rule];
    } else {
      return ["Style"];
    }
  }
};
