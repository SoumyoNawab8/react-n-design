import React, { useMemo, useState } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-css';
import styled from 'styled-components';

interface CodePreviewProps {
  code: string;
  language?: string;
}

const PreviewContainer = styled.div`
  overflow: hidden;
  position: relative;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius};
`;

const CopyButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 4px 12px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.hoverBg};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.75rem;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
  z-index: 1;

  &:hover {
    background: ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.text};
  }
`;

const CodeContainer = styled.div`
  display: flex;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
  font-size: 0.875rem;
  line-height: 1.5;
  background: ${({ theme }) => theme.colors.cardBg};
  color: ${({ theme }) => theme.colors.text};
`;

const LineNumbers = styled.div`
  flex-shrink: 0;
  padding: 16px 12px;
  text-align: right;
  color: ${({ theme }) => theme.colors.textSecondary};
  background: ${({ theme }) => theme.colors.hoverBg};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  user-select: none;
`;

const CodeContent = styled.pre`
  flex: 1;
  margin: 0;
  padding: 16px;
  overflow-x: auto;
  background: transparent;
`;

const CodeBlock = styled.code`
  display: block;
`;

const CodePreview: React.FC<CodePreviewProps> = ({ code, language = 'tsx' }) => {
  const [copied, setCopied] = useState(false);

  const highlighted = useMemo(() => {
    const trimmed = code.trim();
    const lang =
      Prism.languages[language] ||
      Prism.languages.typescript ||
      Prism.languages.jsx ||
      Prism.languages.bash ||
      Prism.languages.css;
    return Prism.highlight(trimmed, lang, language);
  }, [code, language]);

  const lines = code.trim().split('\n');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore copy errors
    }
  };

  return (
    <PreviewContainer>
      <CopyButton onClick={handleCopy}>
        {copied ? 'Copied!' : 'Copy'}
      </CopyButton>
      <CodeContainer>
        <LineNumbers>
          {lines.map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </LineNumbers>
        <CodeContent>
          <CodeBlock
            className={`language-${language}`}
            dangerouslySetInnerHTML={{ __html: highlighted }}
          />
        </CodeContent>
      </CodeContainer>
    </PreviewContainer>
  );
};

export { CodePreview };
export default CodePreview;
