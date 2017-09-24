const sinon = require("sinon");
const performance = require("performance");

describe("performance", () => {
  describe("#withTiming", () => {
    beforeEach(() => sinon.stub(console, "error"));
    afterEach(() => console.error.restore());

    context("when debugging is off", () => {
      before(() => global.debug = false);

      it("doesn't output anything", () => {
        performance.withTiming("wont-output", () => 1 + 1);

        expect(console.error).not.to.be.called;
      });
    });

    context("when debugging is on", () => {
      before(() => global.debug = true);
      after(() => global.debug = false);

      it("outputs a message with some timing", () => {
        performance.withTiming("will-output", () => 1 + 1);

        expect(console.error).to.have.been.called;
      });
    });
  });
});
