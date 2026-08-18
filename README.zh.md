# dsh-wolfram

从 [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) 调用 [Wolfram Mathematica](https://www.wolfram.com/mathematica/)（或免费的 [Wolfram Engine](https://www.wolfram.com/engine/)）。它注册一个 `wolfram` 工具，通过 `wolframscript` 执行 Mathematica 代码并返回结果。

## 前置要求

安装 Wolfram Mathematica 或免费的 Wolfram Engine（提供 `wolframscript` 命令）。验证是否可用：

```sh
wolframscript -code "Integrate[Cos[x], x]"
```

## 安装

```sh
dsh plugin --profile web add dsh-wolfram
```

## 用法

agent 会自动调用 `wolfram` 工具，入参只有一个 `expression`（一段 Mathematica 代码字符串）。

示例：

- 积分：`Integrate[Cos[x], x]` → `Sin[x]`
- 解方程：`Solve[x^2 - 1 == 0, x]` → `{{x -> -1}, {x -> 1}}`
- 极限：`Limit[Sin[x]/x, x -> 0]` → `1`
- 级数：`Series[Exp[x], {x, 0, 3}]` → `1 + x + x^2/2 + x^3/6 + O[x]^4`

## 原理

插件使用 Node 内置的 `child_process` 模块执行 `wolframscript -code <expression>` 并捕获标准输出，无 npm 依赖。

## 许可证

MIT
