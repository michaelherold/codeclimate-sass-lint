# Code Climate Sass-Lint Engine

[![Build Status](https://github.com/michaelherold/codeclimate-sass-lint/actions/workflows/ci.yml/badge.svg)](https://github.com/michaelherold/codeclimate-sass-lint/actions/workflows/ci.yml)
[![Inline docs](http://inch-ci.org/github/michaelherold/codeclimate-sass-lint.svg?branch=master)][inch]

[ci]: https://github.com/michaelherold/codeclimate-sass-lint/actions/workflows/ci.yml
[inch]: http://inch-ci.org/github/michaelherold/codeclimate-sass-lint

Have you ever wanted to know exactly how good you are at writing consistent Sass? Well, look no more! By using this Code Climate engine, you can harness the power of [sass-lint] to score your code.

[sass-lint]: https://github.com/sasstools/sass-lint

## Want to Help?

Awesome! We strive to be welcoming to everyone. Check out the [contributing guide] and make sure to read our [code of conduct].

[contributing guide]: https://github.com/michaelherold/codeclimate-sass-lint/blob/master/CONTRIBUTING.md
[code of conduct]: https://github.com/michaelherold/codeclimate-sass-lint/blob/master/CODE_OF_CONDUCT.md

## Need Some Help?

For help with Sass-lint, [check out their documentation].

If you're running into a Code Climate issue, first check out our [engine documentation](#usage) and look over any existing [issues][issues], as your question may have already been covered. If not, please [open an issue][open-issue] and we'll see what we can do to help.

[check out their documentation]: https://github.com/sasstools/sass-lint
[issues]: https://github.com/michaelherold/codeclimate-sass-lint/issues
[open-issue]: https://github.com/michaelherold/codeclimate-sass-lint/issues/new

## Installation

Since this isn't a publicly released engine yet, you will have to build the engine from this repository. You will need the Code Climate CLI installed, as well as the `git` and `make` commands.

1. If you haven't already, [install the Code Climate CLI].
2. If you do not have Git, install it.
3. If you do not have `make`, install it. On a Mac, you can get it with XCode. On Linux, you can get it in your package manager (the `build-essential` package in Ubuntu or `base-devel` package on Arch linux). On Windows, you probably need Cygwin or the Linux Subsystem for Windows.
4. Make the engine's Docker container with `make`.

If the container fails to build, [file an issue][open-issue].

You should now be able to use the engine through the Code Climate CLI as
a development-level engine. To use it on your project, first navigate to your
project's directory. Then use the following command:

    $ codeclimate analyze -e sass-lint --dev

[install the Code Climate CLI]: https://github.com/codeclimate/codeclimate

## Usage

Like other Code Climate engines, you configure this one through the use of a `.codeclimate.yml` file in your project's root directory. If you don't already have one, you can use the `codeclimate engines:enable sass_lint` command to generate a basic `.codeclimate.yml` file with the engine enabled.

If you don't care to tweak your configuration, you should now be able to run the engine with the analyze command:

    $ codeclimate analyze

To tweak the rules that Sass-Lint will run, follow this pattern in the configuration file:

```yaml
engines:
  sass-lint:
    enabled: true
    config:
      file: my_custom_sass_lint.yml
    debug: true
    rules:
      indentation:
        - 2
        - size: 2
exclude_paths:
  - ignored_directory/
```

Most of the configuration lives under the `engines.sass-lint` key. The options are as follows:

* `config.file` - The Sass-Lint configuration file you want to use as a base.
* `debug` - Set this to true to output timing and debug information from the engine.
* `rules` - Configure this in the same way you configure rules in `.sass-lint.yml`. These will override any settings you have in your configuration file.
* Global configuration like `exclude_paths` is also included in the engine's configuration. See the [Code Climate documentation] for more information.

[Code Climate documentation]: https://docs.codeclimate.com/docs/configuring-your-code-climate-analysis

## Versioning

This engine is versioned based on the versioning scheme of Sass-Lint. It uses the version of the Sass-Lint library that is installed as the base version and then adds a build number. For example, the first time the engine is built and released for the `0.23.1` version of Sass-Lint, the engine's version is `0.23.1-1`. If there are any bugs that are fixed in the engine without updating the Sass-Lint version, the build number will be incremented (e.g. to `0.23.1-2`).

## License

The engine is available as open source under the terms of the [MIT License][license].

[license]: http://opensource.org/licenses/MIT
