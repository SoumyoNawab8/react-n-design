'use client';
import type React from 'react';
import { useCallback, useState } from 'react';
import { FaCheck, FaCopy } from '../../icons';
import {
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockLanguage,
  CodeBlockLine,
  CodeBlockLineContent,
  CodeBlockLineNumber,
  CodeBlockPre,
  CodeBlockWrapper,
} from './CodeBlock.styles';

export interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  copyable?: boolean;
}

const LANGUAGE_COLORS: Record<string, string> = {
  javascript: '#f7df1e',
  typescript: '#3178c6',
  js: '#f7df1e',
  ts: '#3178c6',
  jsx: '#61dafb',
  tsx: '#61dafb',
  python: '#3776ab',
  py: '#3776ab',
  html: '#e34c26',
  css: '#264de4',
  scss: '#cf649a',
  json: '#a0a5b0',
  bash: '#4e9a06',
  shell: '#4e9a06',
  sh: '#4e9a06',
  sql: '#f29111',
  go: '#00add8',
  rust: '#dea584',
  java: '#b07219',
  cpp: '#f34b7d',
  c: '#555555',
  ruby: '#701516',
  php: '#4f5d95',
  markdown: '#083fa1',
  md: '#083fa1',
  yaml: '#cb171e',
  xml: '#0060ac',
  dockerfile: '#384d54',
  default: '#6d5dfc',
};

function highlightCode(code: string, language?: string): React.ReactNode[] {
  if (!language) return code.split('\n').map((line) => <span>{line}</span>);

  const lang = language.toLowerCase();
  const rules: { regex: RegExp; color: string }[] = [];

  if (['javascript', 'typescript', 'js', 'ts', 'jsx', 'tsx'].includes(lang)) {
    rules.push(
      {
        regex:
          /\b(const|let|var|function|class|interface|type|return|if|else|for|while|switch|case|break|continue|new|this|import|export|from|async|await|try|catch|throw|typeof|instanceof|in|of|yield|default|extends|implements|static|public|private|protected|readonly|abstract|enum|namespace|module|declare|as|satisfies|asserts|infer|is|keyof|unique|using|await)\b/g,
        color: '#c678dd',
      },
      { regex: /\b(true|false|null|undefined|NaN|Infinity)\b/g, color: '#d19a66' },
      {
        regex:
          /\b(console|window|document|Math|Date|Array|Object|String|Number|Boolean|Promise|Set|Map|JSON|RegExp|Error|Intl|fetch|setTimeout|setInterval|requestAnimationFrame)\b/g,
        color: '#e5c07b',
      },
      { regex: /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g, color: '#98c379' },
      { regex: /\/\/.*$/gm, color: '#7f848e' },
      { regex: /\/\*[\s\S]*?\*\//g, color: '#7f848e' },
      { regex: /\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b/g, color: '#d19a66' }
    );
  } else if (['python', 'py'].includes(lang)) {
    rules.push(
      {
        regex:
          /\b(def|class|if|else|elif|for|while|return|import|from|as|try|except|finally|with|pass|break|continue|lambda|yield|assert|del|global|nonlocal|raise|in|is|not|and|or|None|True|False|async|await)\b/g,
        color: '#c678dd',
      },
      { regex: /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g, color: '#98c379' },
      { regex: /#.*/g, color: '#7f848e' },
      { regex: /\b\d+(?:\.\d+)?\b/g, color: '#d19a66' }
    );
  } else if (['html', 'xml'].includes(lang)) {
    rules.push(
      { regex: /&lt;\/?[\w-]+/g, color: '#e06c75' },
      { regex: /[\w-]+=/g, color: '#d19a66' },
      { regex: /"(?:[^"\\]|\\.)*"/g, color: '#98c379' },
      { regex: /&lt;!--[\s\S]*?--&gt;/g, color: '#7f848e' }
    );
  } else if (['css', 'scss'].includes(lang)) {
    rules.push(
      { regex: /([\w-]+)\s*:/g, color: '#d19a66' },
      { regex: /\.[\w-]+/g, color: '#e5c07b' },
      { regex: /#[\w-]+/g, color: '#e06c75' },
      {
        regex: /\b(px|rem|em|%|vh|vw|s|ms|deg|rad|turn|rgb|rgba|hsl|hsla|var|calc|url)\b/g,
        color: '#c678dd',
      },
      { regex: /\/\*[\s\S]*?\*\//g, color: '#7f848e' },
      { regex: /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g, color: '#98c379' }
    );
  } else {
    rules.push(
      {
        regex:
          /\b(true|false|null|undefined|if|else|for|while|return|function|class|import|export|const|let|var|try|catch)\b/g,
        color: '#c678dd',
      },
      { regex: /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g, color: '#98c379' },
      { regex: /\/\/.*$/gm, color: '#7f848e' },
      { regex: /\b\d+(?:\.\d+)?\b/g, color: '#d19a66' }
    );
  }

  const lines = code.split('\n');

  return lines.map((line, lineIndex) => {
    if (!line) return <span key={lineIndex}> </span>;

    const segments: { text: string; color?: string }[] = [{ text: line }];

    rules.forEach(({ regex, color }) => {
      const newSegments: { text: string; color?: string }[] = [];
      segments.forEach((seg) => {
        if (seg.color) {
          newSegments.push(seg);
          return;
        }
        let match;
        const localRegex = new RegExp(
          regex.source,
          regex.flags.includes('g') ? regex.flags : `${regex.flags}g`
        );
        localRegex.lastIndex = 0;
        let lastIndex = 0;
        while ((match = localRegex.exec(seg.text)) !== null) {
          if (match.index > lastIndex) {
            newSegments.push({ text: seg.text.slice(lastIndex, match.index) });
          }
          newSegments.push({ text: match[0], color });
          lastIndex = match.index + match[0].length;
        }
        if (lastIndex < seg.text.length) {
          newSegments.push({ text: seg.text.slice(lastIndex) });
        }
      });
      // Reset for next rule
      if (newSegments.length > 0) {
        segments.length = 0;
        segments.push(...newSegments);
      }
    });

    return (
      <span key={lineIndex}>
        {segments.map((seg, i) =>
          seg.color ? (
            <span key={i} style={{ color: seg.color }}>
              {seg.text}
            </span>
          ) : (
            <span key={i}>{seg.text}</span>
          )
        )}
      </span>
    );
  });
}

/**
 * A syntax-highlighted code block with an optional copy button
 * and line numbers, styled for the neomorphic design system.
 */
export const CodeBlock = ({
  code,
  language,
  showLineNumbers = false,
  copyable = true,
}: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [code]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleCopy();
      }
    },
    [handleCopy]
  );

  const highlighted = highlightCode(code, language);
  const lines = code.split('\n');

  return (
    <CodeBlockWrapper>
      <CodeBlockHeader>
        {language && (
          <CodeBlockLanguage
            color={LANGUAGE_COLORS[language.toLowerCase()] || LANGUAGE_COLORS.default}
          >
            {language}
          </CodeBlockLanguage>
        )}
        {copyable && (
          <CodeBlockCopyButton
            onClick={handleCopy}
            onKeyDown={handleKeyDown}
            aria-label={copied ? 'Copied to clipboard' : 'Copy code to clipboard'}
            title={copied ? 'Copied!' : 'Copy'}
          >
            {copied ? <FaCheck /> : <FaCopy />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </CodeBlockCopyButton>
        )}
      </CodeBlockHeader>
      <CodeBlockContent>
        <CodeBlockPre>
          {lines.map((_, i) => (
            <CodeBlockLine key={i}>
              {showLineNumbers && (
                <CodeBlockLineNumber aria-hidden="true">{i + 1}</CodeBlockLineNumber>
              )}
              <CodeBlockLineContent>{highlighted[i]}</CodeBlockLineContent>
            </CodeBlockLine>
          ))}
        </CodeBlockPre>
      </CodeBlockContent>
    </CodeBlockWrapper>
  );
};
