const config = require("config");
const temp = require("temp-write");

describe("config", () => {
  describe("#fromFile", () => {
    context("when the configuration file does not exist", () => {
      it("loads the defaults", () => {
        const subject = config.fromFile();

        expect(subject).to.be.an("object");
        expect(subject).to.have.property("files");
        expect(subject.files).to.be.an("object");
        expect(subject.files).to.have.property("ignore");
      });
    });

    context("when the configuration file exists", () => {
      it("merges the configuration with the defaults", () => {
        const content = `
          {
            "config": "my-sass-lint.yml"
          }`;
        const file = temp.sync(content, "config.json");
        const subject = config.fromFile(file);

        expect(subject).to.be.an("object");
        expect(subject).to.have.property("config");
        expect(subject.config).to.eq("my-sass-lint.yml");
      });
    });
  });

  describe("#fromObject", () => {
    context("when the object is empty", () => {
      it("loads the defaults", () => {
        const subject = config.fromObject();

        expect(subject).to.be.an("object");
        expect(subject).to.have.property("files");
        expect(subject.files).to.be.an("object");
        expect(subject.files).to.have.property("ignore");
      });
    });

    context("when the object is non-empty", () => {
      it("merges the configuration with the defaults", () => {
        const extras = { config: "my-sass-lint.yml" };
        const subject = config.fromObject(extras);

        expect(subject).to.be.an("object");
        expect(subject).to.have.property("config");
        expect(subject.config).to.eq("my-sass-lint.yml");
      });
    });
  });
});
