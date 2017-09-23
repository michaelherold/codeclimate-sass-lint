const contents = require("contents");

describe("contents", () => {
  describe("#contentsFor", () => {
    it("fetches the contents and caches them for later use", () => {
      const rule = "quotes";

      const subject = contents.contentsFor(rule);

      expect(subject).to.match(/# Quotes/);
      expect(contents.index).to.include.keys(rule);
    });

    it("handles unknown rules", () => {
      const rule = "boogaloo";

      const subject = contents.contentsFor(rule);

      expect(subject).to.equal("");
      expect(contents.index).to.include.keys(rule);
    });
  });
});
