import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { defineTool } from '@deepseek-ai/dsh-tools'

export const name = 'wolfram-tool'
export const inject = ['tools']

const execFileAsync = promisify(execFile)

export function apply(ctx) {
  ctx.tools.register(defineTool({
    name: 'wolfram',
    description: '最严谨精密的数学工具，调用 Mathematica（Wolfram 引擎）计算数学表达式，支持符号积分、解方程、极限、级数展开等。适合科学研究、工程计算、数学建模等场景。',
    parameters: {
      expression: {
        type: 'string',
        required: true,
        description: 'Mathematica 代码，例如 "Integrate[Cos[x], x]"、"Solve[x^2 - 1 == 0, x]"',
      },
    },
    output: {
      schema: { type: 'string' },
      render: (_args, value) => [{ type: 'text', text: value }],
    },
    async execute(args) {
      try {
        const { stdout, stderr } = await execFileAsync('wolframscript', ['-code', args.expression])
        if (stderr) return `Error: ${stderr.trim()}`
        return stdout.trim()
      } catch (error) {
        return `Error: ${error.message}`
      }
    },
  }))
}