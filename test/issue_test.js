const issue = require("issue");

describe("issue", () => {
  describe("#toIssue", () => {
    it("converts a lint into the CodeClimate issue format", () => {
      const lint = {
        ruleId: "quotes",
        line: 60,
        column: 12,
        message: "Strings must use single quotes",
        severity: 1,
        path: "test.scss"
      };

      const subject = issue.toIssue(lint);

      expect(subject.type).to.equal("issue");
      expect(subject.check_name).to.equal("quotes");
      expect(subject.description).to.equal("Strings must use single quotes");
      expect(subject.content).to.match(/# Quotes/);
      expect(subject.categories).to.deep.equal(["Style"]);
      expect(subject.location).to.deep.equal({path: "test.scss", begin: {line: 60, column: 12}});
      expect(subject.remediation_points).to.equal(50000);
      expect(subject.severity).to.equal("major");
    });
  });
});
