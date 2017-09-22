const config = require("config");
const temp = require("temp-write");

const defaultConfig = {
  config: null,
  enabled: true,
  files: {
    ignore: [],
    include: ["./"]
  },
  rules: {}
};

describe("config", () => {
  describe("#fromFile", () => {
    context("when the configuration file does not exist", () => {
      it("loads the defaults", () => {
        const subject = config.fromFile();

        expect(subject).to.deep.equal(defaultConfig);
      });
    });

    context("when the configuration file exists", () => {
      it("merges the configuration with the defaults", () => {
        const content = `
          {
            "config": {
              "file": "my-sass-lint.yml"
            },
            "enabled": true,
            "exclude_paths": [
              "config/",
              ".gitignore"
            ],
            "include_paths": [
              "app/"
            ],
            "rules": {
              "indentation": [
                2,
                { "size": 2 }
              ]
            }
          }`;
        const file = temp.sync(content, "config.json");
        const subject = config.fromFile(file);

        expect(subject).to.deep.equal({
          config: "my-sass-lint.yml",
          enabled: true,
          files: {
            ignore: [
              "config/",
              ".gitignore"
            ],
            include: [
              "./",
              "app/"
            ]
          },
          rules: {
            indentation: [
              2,
              { size: 2 }
            ]
          }
        });
      });
    });
  });

  describe("#fromObject", () => {
    context("when the object is empty", () => {
      it("loads the defaults", () => {
        const subject = config.fromObject();

        expect(subject).to.deep.equal(defaultConfig);
      });
    });

    context("when the object is non-empty", () => {
      it("merges the configuration with the defaults", () => {
        const extras = { config: { file: "my-sass-lint.yml" } };
        const subject = config.fromObject(extras);

        expect(subject).to.deep.equal({
          config: "my-sass-lint.yml",
          enabled: true,
          files: {
            ignore: [],
            include: ["./"]
          },
          rules: {}
        });
      });
    });
  });
});
