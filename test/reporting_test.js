const sinon = require("sinon");
const reporting = require("reporting");

const validateIssue = (message) => {
  expect(message).to.match(/^(\{.*\})\0\n$/);

  const fn = () => JSON.parse(RegExp.lastMatch);
  expect(fn).not.to.throw;
};

describe("reporting", () => {
  describe("#reportIssuesForFile", () => {
    beforeEach(() => sinon.stub(console, "log").callsFake(validateIssue));
    afterEach(() => console.log.restore());

    it("outputs a null-terminated line for each message", () => {
      const file = {
        filePath: "test.scss",
        messages: [
          {
            ruleId: "quotes",
            line: 60,
            column: 12,
            message: "Strings must use single quotes",
            severity: 1,
            path: "/src/test.scss"
          },
          {
            ruleId: "quotes",
            line: 61,
            column: 12,
            message: "Strings must use single quotes",
            severity: 1,
            path: "/src/test.scss"
          }
        ]
      };

      reporting.reportIssuesForFile("/src", file);

      expect(console.log).to.have.been.calledTwice;
    });
  });
});
