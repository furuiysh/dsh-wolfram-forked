# dsh-wolfram

从 [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) 调用 [Wolfram Mathematica](https://www.wolfram.com/mathematica/)（或免费的 [Wolfram Engine](https://www.wolfram.com/engine/)）。它注册一个 `wolfram` 工具，通过 `wolframscript` 执行 Mathematica 代码并返回结果。

## 前置要求

安装 Wolfram Mathematica 或免费的 Wolfram Engine（提供 `wolframscript` 命令）。验证是否可用：

```sh
wolframscript -code "Integrate[Cos[x], x]"
```

## 安装

本插件未发布到 npm，需从本 fork 的 GitHub 仓库安装：

```sh
dsh plugin --profile desktop add github:furuiysh/dsh-wolfram-forked
```

`desktop` 是 DeepSeek Harness 桌面版的 profile 名（`dsh web` 的 profile 为 `web`），按你实际运行的 profile 替换。

## 兼容性

插件支持 DSH 0.1.x 与 0.2.x 系列，包括 `0.2.1-rc.5` 和 `0.2.2-alpha` 预发布版本。声明的 `peerDependencies` 范围为：

```text
>=0.0.1-rc.1 <0.1.0 || >=0.1.0-rc.1 <0.2.0-0 || >=0.2.1-rc.1 <0.3.0-0
```

当插件的 `@deepseek-ai/dsh-tools` 要求与运行时版本不匹配时，DSH 会直接拒绝安装（而非仅警告）。0.3.x 系列未经验证，故不声明支持。

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
