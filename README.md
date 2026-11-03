# dsh-wolfram

Call [Wolfram Mathematica](https://www.wolfram.com/mathematica/) (or the free [Wolfram Engine](https://www.wolfram.com/engine/)) from [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness). It registers a `wolfram` tool that runs Mathematica code through `wolframscript` and returns the result.

## Prerequisites

Install Wolfram Mathematica or the free Wolfram Engine, which provides the `wolframscript` command. Verify it works:

```sh
wolframscript -code "Integrate[Cos[x], x]"
```

## Install

This plugin is not published to npm. Install it from the fork's GitHub repository:

```sh
dsh plugin --profile desktop add github:furuiysh/dsh-wolfram-forked
```

Replace `desktop` with the profile you actually run — `desktop` is the DeepSeek Harness desktop app, `web` is a `dsh web` profile.

## Compatibility

The plugin supports DSH 0.1.x and the 0.2.x line, including `0.2.1-rc.5` and the `0.2.2-alpha` prereleases. Its declared `peerDependencies` range is:

```text
>=0.0.1-rc.1 <0.1.0 || >=0.1.0-rc.1 <0.2.0-0 || >=0.2.1-rc.1 <0.3.0-0
```

DSH refuses to install a plugin whose `@deepseek-ai/dsh-tools` requirement does not match the running runtime (it is a hard rejection, not a warning). The 0.3.x line is untested and deliberately not claimed.

## Usage

The agent calls the `wolfram` tool automatically with one `expression` argument (a string of Mathematica code).

Examples:

- integral: `Integrate[Cos[x], x]` → `Sin[x]`
- solve: `Solve[x^2 - 1 == 0, x]` → `{{x -> -1}, {x -> 1}}`
- limit: `Limit[Sin[x]/x, x -> 0]` → `1`
- series: `Series[Exp[x], {x, 0, 3}]` → `1 + x + x^2/2 + x^3/6 + O[x]^4`

## How it works(on dsh)

The plugin uses Node's built-in `child_process` module to run `wolframscript -code <expression>` and captures the standard output. It has no npm dependencies.

## License

MIT
