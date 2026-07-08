import React from 'react';
import styled from 'styled-components';
import { Card, Stack, Divider, Title, Text } from 'react-n-design';
import { FiGithub } from 'react-icons/fi';
import { CodePreview } from '../components/CodePreview';

const Page = styled.div`
  padding: 72px 0 32px;
`;

const Hero = styled.section`
  text-align: center;
  margin-bottom: 48px;
`;

const GradientTitle = styled(Title)`
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary} 0%,
    #a78bfa 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: inline-block;
  line-height: 1.2;
`;

const Subtitle = styled(Text)`
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 640px;
  margin: 16px auto 0;
`;

const Section = styled(Card)``;

const GithubLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: ${({ theme }) => theme.borderRadius};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  text-decoration: none;
  font-weight: 500;
  box-shadow: ${({ theme }) => theme.shadows.soft};
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.strong};
  }
`;

export const GetStarted: React.FC = () => {
  return (
    <Page>
      <Hero>
        <GradientTitle level={1}>Get Started with react-n-design</GradientTitle>
        <Subtitle as="p" size="large">
          A modern, accessible, and animated React component library built with
          neomorphism in mind.
        </Subtitle>
      </Hero>

      <Stack gap={32} direction="column">
        <Section variant="outset" bordered>
          <Title level={2}>Installation</Title>
          <Divider />
          <Text as="p">
            Install the package via npm or your favourite package manager.
          </Text>
          <CodePreview code="npm install react-n-design" language="bash" />
        </Section>

        <Section variant="outset" bordered>
          <Title level={2}>Quick Start</Title>
          <Divider />
          <Text as="p">
            Wrap your application with <code>AppThemeProvider</code> and start
            dropping in components.
          </Text>
          <CodePreview
            code={`import { AppThemeProvider, Button } from 'react-n-design';

function App() {
  return (
    <AppThemeProvider>
      <Button variant="primary">Hello, world!</Button>
    </AppThemeProvider>
  );
}`}
            language="tsx"
          />
        </Section>

        <Section variant="outset" bordered>
          <Title level={2}>Theming</Title>
          <Divider />
          <Text as="p">
            The library ships with <strong>light</strong>, <strong>dark</strong>,
            and <strong>system</strong> modes out of the box. Use the{' '}
            <code>useTheme</code> hook to read or switch the current theme at
            runtime.
          </Text>
          <Text as="p">
            Design tokens are exposed as CSS custom properties, so you can
            override colours, shadows, and radii in your own stylesheets without
            touching component internals.
          </Text>
          <CodePreview
            code={`import { useTheme } from 'react-n-design';

const { theme, setTheme } = useTheme();
// setTheme('light' | 'dark' | 'system');`}
            language="tsx"
          />
        </Section>

        <Section variant="outset" bordered>
          <Title level={2}>Tree Shaking</Title>
          <Divider />
          <Text as="p">
            Prefer direct imports for the smallest possible bundle. The library
            is fully tree-shakeable.
          </Text>
          <CodePreview
            code={`// Recommended direct import
import { Button } from 'react-n-design/components/Button';

// Or use the barrel if your bundler handles tree-shaking
import { Button } from 'react-n-design';`}
            language="tsx"
          />
        </Section>

        <Section variant="outset" bordered>
          <Title level={2}>Adapters</Title>
          <Divider />
          <Text as="p">
            An official React Hook Form adapter is available so you can wire
            complex inputs with minimal boilerplate.
          </Text>
          <CodePreview
            code={`import { useForm } from 'react-hook-form';
import { InputAdapter } from 'react-n-design/adapters/react-hook-form';`}
            language="tsx"
          />
        </Section>

        <Section variant="outset" bordered>
          <Title level={2}>Accessibility</Title>
          <Divider />
          <Stack gap={8} direction="column">
            <Text as="p">
              All components are engineered for WCAG 2.1 AA compliance, with
              robust keyboard navigation and focus management.
            </Text>
            <Text as="p">
              Drop the <code>SkipToContent</code> component at the top of your
              layout to give keyboard and screen-reader users a fast-path to the
              main content.
            </Text>
            <Text as="p">
              Animations automatically respect <code>prefers-reduced-motion</code>{' '}
              when the user opts for reduced motion at the OS level.
            </Text>
          </Stack>
          <CodePreview
            code={`import { SkipToContent } from 'react-n-design';

<SkipToContent targetId="main-content" />`}
            language="tsx"
          />
        </Section>

        <Section variant="outset" bordered>
          <Title level={2}>Print & Touch</Title>
          <Divider />
          <Text as="p">
            Import utility stylesheets to ensure your UI looks great on paper and
            feels native on touch devices.
          </Text>
          <CodePreview
            code={`import 'react-n-design/styles/tokens.css';
import 'react-n-design/styles/print.css';
import 'react-n-design/styles/touch.css';`}
            language="tsx"
          />
        </Section>

        <Section variant="outset" bordered>
          <Title level={2}>Contributing</Title>
          <Divider />
          <Text as="p">
            Found a bug or have an idea for a new component? We welcome
            contributions! Open an issue or pull request on GitHub.
          </Text>
          <GithubLink
            href="https://github.com/SoumyoNawab8/react-n-design"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FiGithub size={18} />
            View on GitHub
          </GithubLink>
        </Section>
      </Stack>
    </Page>
  );
};
