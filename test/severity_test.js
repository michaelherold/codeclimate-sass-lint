const severity = require("severity");

describe("severity", () => {
  describe("#toSeverity", () => {
    it("converts 'off' results to 'minor'", () => {
      const subject = severity.toSeverity(0);

      expect(subject).to.equal("minor");
    });

    it("converts 'warn' results to 'major'", () => {
      const subject = severity.toSeverity(1);

      expect(subject).to.equal("major");
    });

    it("converts 'error' results to 'blocker'", () => {
      const subject = severity.toSeverity(2);

      expect(subject).to.equal("blocker");
    });

    it("converts unknown results to 'info'", () => {
      const subject = severity.toSeverity();

      expect(subject).to.equal("info");
    });
  });
});
