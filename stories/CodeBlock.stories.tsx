import type { Meta, StoryObj } from '@storybook/react';
import { CodeBlock } from '../src/components/CodeBlock';

const meta: Meta<typeof CodeBlock> = {
  title: 'AI / CodeBlock',
  component: CodeBlock,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A syntax-highlighted code block with language detection, optional line numbers, and a copy-to-clipboard button.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    code: { control: 'text' },
    language: { control: 'text' },
    showLineNumbers: { control: 'boolean' },
    copyable: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const tsCode = `interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'text';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  onClick?: () => void;
}

export const Button = ({ variant = 'primary', size = 'medium', loading, onClick }: ButtonProps) => {
  return (
    <button
      className={\`btn btn--\${variant} btn--\${size}\`}
      disabled={loading}
      onClick={onClick}
    >
      {loading ? 'Loading...' : 'Click me'}
    </button>
  );
};`;

const pythonCode = `def fibonacci(n: int) -> int:
    """Return the nth Fibonacci number."""
    if n <= 1:
        return n
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b

# Example usage
for i in range(10):
    print(f"F({i}) = {fibonacci(i)}")`;

export const TypeScript: Story = {
  args: {
    code: tsCode,
    language: 'typescript',
    showLineNumbers: true,
    copyable: true,
  },
};

export const Python: Story = {
  args: {
    code: pythonCode,
    language: 'python',
    showLineNumbers: false,
    copyable: true,
  },
};

export const WithoutLineNumbers: Story = {
  args: {
    code: tsCode,
    language: 'typescript',
    showLineNumbers: false,
    copyable: true,
  },
};

export const NotCopyable: Story = {
  args: {
    code: 'const secret = "do-not-copy";',
    language: 'javascript',
    showLineNumbers: false,
    copyable: false,
  },
};

export const NoLanguage: Story = {
  args: {
    code: 'Plain text block without any syntax highlighting.',
    showLineNumbers: false,
    copyable: true,
  },
};
