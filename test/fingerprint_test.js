const Fingerprint = require("fingerprint");

describe("Fingerprint", () => {
  describe("#toString", () => {
    it("calculates a fingerprint for a lint", () => {
      const lint = {
        ruleId: "no-color-literals",
        line: 61,
        column: 17,
        message: "Color literals such as 'blue' should only be used in variable declarations",
        severity: 1,
        path: "test.scss"
      };

      const subject = new Fingerprint(lint).toString();

      expect(subject).to.equal("c4a3f8ac81083d186e0e724137594543");
    });
  });
});
