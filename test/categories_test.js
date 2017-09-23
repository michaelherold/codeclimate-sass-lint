const categories = require("categories");

describe("categories", () => {
  describe("#categoriesFor", () => {
    it("looks up the categories for a rule", () => {
      const subject = categories.categoriesFor("max-file-line-count");

      expect(subject).to.deep.equal(["Complexity"]);
    });

    it("handles unknown rules", () => {
      const subject = categories.categoriesFor("boogaloo");

      expect(subject).to.deep.equal(["Style"]);
    });
  });
});
