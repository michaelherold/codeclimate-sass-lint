const path = require("path");
const { exampleFile, examplesPath, inDirectory } = require(path.join(__dirname, "./support/file-system-helper"));

const fileList = require("file-list");
const config = require("config");

describe("file-list", () => {
  const root = examplesPath("file-list");

  describe("#filesToInspect", () => {
    context("without any engine configuration", () => {
      it("uses the default include path", () => {
        inDirectory(root, () => {
          const aPath = exampleFile("a.scss");
          const notSassPath = exampleFile("not_sass.css");

          const subject = fileList.filesToInspect(root, {});

          expect(subject).to.include(aPath);
          expect(subject).not.to.include(notSassPath);
        });
      });
    });

    context("with engine configuration", () => {
      let engineConfig;

      before(() => {
        engineConfig = config.fromObject({include_paths: ["src/"]});
      });

      it("respects the engine configuration's include_paths", () => {
        inDirectory(root, () => {
          const aPath = exampleFile("a.scss");
          const bPath = exampleFile("src/b.sass");

          const subject = fileList.filesToInspect(root, engineConfig);

          expect(subject).to.include(bPath);
          expect(subject).not.to.include(aPath);
        });
      });

      context("that has a single file as its include_paths", () => {
        before(() => {
          engineConfig = config.fromObject({include_paths: ["src/b.sass"]});
        });

        it("respects the engine configuration's include_paths", () => {
          inDirectory(root, () => {
            const aPath = exampleFile("a.scss");
            const bPath = exampleFile("src/b.sass");

            const subject = fileList.filesToInspect(root, engineConfig);

            expect(subject).to.include(bPath);
            expect(subject).not.to.include(aPath);
          });
        });
      });

      context("that has both include_paths and exclude_paths", () => {
        before(() => {
          engineConfig = config.fromObject({
            exclude_paths: ["src/b.sass"],
            include_paths: ["src/"]
          });
        });

        it("prefers the exclude_paths", () => {
          inDirectory(root, () => {
            const aPath = exampleFile("a.scss");
            const bPath = exampleFile("src/b.sass");

            const subject = fileList.filesToInspect(root, engineConfig);

            expect(subject).not.to.include(aPath);
            expect(subject).not.to.include(bPath);
          });
        });
      });

      context("that has a file in include_paths that should not be included", () => {
        before(() => {
          engineConfig = config.fromObject({
            include_paths: ["not_sass.css"]
          });
        });

        it("does not include the file", () => {
          const notSassPath = exampleFile("not_sass.css");

          const subject = fileList.filesToInspect(root, engineConfig);

          expect(subject).not.to.include(notSassPath);
        });
      });
    });
  });
});
