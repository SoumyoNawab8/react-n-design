import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { Tabs } from 'react-n-design';
import { CodePreview } from './CodePreview';
import { getExamplesFor, componentExamples, type Example } from '../data/componentExamples';

const DemoSurface = styled.div`
  padding: 24px;
  min-height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius};
`;

const CodeToggle = styled.button`
  margin-top: 10px;
  padding: 5px 12px;
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: transparent;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.hoverBg};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const CodeBlockWrapper = styled.div`
  margin-top: 16px;
`;

const NoExample = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
`;

const ExampleTabItem: React.FC<{
  example: Example;
  showCode: boolean;
  onToggleCode: () => void;
}> = ({ example, showCode, onToggleCode }) => {
  const rendered = useMemo(() => example.render(), [example]);

  return (
    <div>
      <DemoSurface>{rendered}</DemoSurface>
      <CodeToggle onClick={onToggleCode}>
        {showCode ? 'Hide Code' : 'View Code'}
      </CodeToggle>
      {showCode && (
        <CodeBlockWrapper>
          <CodePreview
            code={example.code || `// ${example.title}\n// ${example.description}\n\n// No code available`}
            language="tsx"
          />
        </CodeBlockWrapper>
      )}
    </div>
  );
};

interface ComponentDemoProps {
  componentName: string;
}

const ComponentDemo: React.FC<ComponentDemoProps> = ({ componentName }) => {
  const [activeKey, setActiveKey] = useState('0');
  const [showCodeMap, setShowCodeMap] = useState<Record<string, boolean>>({});

  const examples = useMemo(() => getExamplesFor(componentName), [componentName]);

  const tabItems = examples.map((ex, i) => ({
    key: String(i),
    label: ex.title,
    children: (
      <ExampleTabItem
        example={ex}
        showCode={!!showCodeMap[String(i)]}
        onToggleCode={() =>
          setShowCodeMap((prev) => ({
            ...prev,
            [String(i)]: !prev[String(i)],
          }))
        }
      />
    ),
  }));

  // Note: removed the hardcoded no-example fallback so that even uncurated
  // components render through the generic fallback in getExamplesFor.
  // If a component is truly missing from componentMap it still shows a message.
  // Keep this guard just to avoid empty tab lists (should not happen now).
  if (examples.length === 0) {
    return (
      <DemoSurface>
        <NoExample>No examples available for {componentName}.</NoExample>
      </DemoSurface>
    );
  }

  return (
    <div>
      <Tabs
        items={tabItems}
        activeKey={activeKey}
        onTabChange={(key) => setActiveKey(key)}
        type="line"
      />
    </div>
  );
};

export default ComponentDemo;
