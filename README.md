# dsh-wolfram frsb

Call [Wolfram Mathematica](https://www.wolfram.com/mathematica/) (or the free [Wolfram Engine](https://www.wolfram.com/engine/)) from [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness). It registers a `wolfram` tool that runs Mathematica code through `wolframscript` and returns the result.

## Prerequisites

Install Wolfram Mathematica or the free Wolfram Engine, which provides the `wolframscript` command. Verify it works:

```sh
wolframscript -code "Integrate[Cos[x], x]"
```

## Install

```sh
dsh plugin --profile web add dsh-wolfram
```

## Usage

The agent calls the `wolfram` tool automatically with one `expression` argument (a string of Mathematica code).

Examples:

- integral: `Integrate[Cos[x], x]` → `Sin[x]`
- solve: `Solve[x^2 - 1 == 0, x]` → `{{x -> -1}, {x -> 1}}`
- limit: `Limit[Sin[x]/x, x -> 0]` → `1`
- series: `Series[Exp[x], {x, 0, 3}]` → `1 + x + x^2/2 + x^3/6 + O[x]^4`

## How it works

The plugin uses Node's built-in `child_process` module to run `wolframscript -code <expression>` and captures the standard output. It has no npm dependencies.

## License

MIT
