const path = require("path");
const analysis = require("analysis");
const { examplesPath, inDirectory } = require(path.join(__dirname, "./support/file-system-helper"));

describe("analysis", () => {
  const root = examplesPath("analysis");

  describe("#analyzeFiles", () => {
    it("analyzes all of the files in the set", () => {
      inDirectory(root, () => {
        const subject = analysis.analyzeFiles(["a.scss"], {config: {file: ".sass-lint.yml"}});

        expect(subject.length).to.equal(1);
        expect(subject[0].messages.length).to.equal(2);
      });
    });
  });
});
