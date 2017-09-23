const remediationPoints = require("remediation-points");

describe("remediation-points", () => {
  describe("#remediationPointsFor", () => {
    it("works", () => {
      const subject = remediationPoints.remediationPointsFor("rule");

      expect(subject).to.equal(50000);
    });
  });
});
