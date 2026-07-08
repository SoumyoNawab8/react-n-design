import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useTheme } from 'react-n-design';
import {
  Button,
  Card,
  Modal,
  Tabs,
  Table,
  Input,
  Badge,
  Stack,
  Title,
  Text,
} from 'react-n-design';
import Hero3D from '../components/Hero3D';
import { ScrollReveal } from '../components/ScrollReveal';

/* ---------- Animations ---------- */
const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

/* ---------- Layout ---------- */
const HomePage = styled.div`
  width: 100%;
`;

const Section = styled.section`
  padding: 96px 0;
`;

const SectionContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`;

/* ---------- Hero ---------- */
const HeroSection = styled.section`
  position: relative;
  width: 100%;
  height: 80vh;
  min-height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-top: -32px;
  padding-top: 72px;
`;

const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 24px;
  pointer-events: none;

  > * {
    pointer-events: auto;
  }
`;

const HeroTextCard = styled.div`
  padding: 32px 40px;
  border-radius: ${({ theme }) => theme.borderRadius};
  background: ${({ theme }) =>
    theme.mode === 'dark'
      ? 'rgba(15, 23, 42, 0.55)'
      : 'rgba(224, 229, 236, 0.65)'};
  backdrop-filter: blur(10px) saturate(140%);
  -webkit-backdrop-filter: blur(10px) saturate(140%);
  box-shadow: ${({ theme }) => theme.shadows.soft};
  border: 1px solid ${({ theme }) => theme.colors.border};
  max-width: 720px;
`;

const GradientTitle = styled.h1<{ $isDark: boolean }>`
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 800;
  margin: 0 0 16px;
  background: ${(p) =>
    p.$isDark
      ? 'linear-gradient(90deg, #7b6efc, #a89bfc, #7b6efc)'
      : 'linear-gradient(90deg, #6d5dfc, #9b8afb, #6d5dfc)'};
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  animation: ${gradientShift} 10s ease infinite;
`;

const Subtitle = styled.p`
  font-size: clamp(1.125rem, 2.5vw, 1.35rem);
  color: ${(p) => p.theme.colors.textSecondary};
  max-width: 640px;
  margin: 0 auto 40px;
  line-height: 1.6;
`;

const CTAGroup = styled(Stack)`
  justify-content: center;
  gap: 20px;

  @media (max-width: 480px) {
    flex-direction: column !important;
    align-items: center;
  }
`;

/* ---------- Features ---------- */
const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 32px;
`;

const FeatureCard = styled(Card)`
  text-align: center;
`;

const FeatureIcon = styled.div`
  width: 64px;
  height: 64px;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 18px;
  background: ${(p) => p.theme.colors.background};
  box-shadow: ${(p) => p.theme.shadows.soft};
  font-size: 1.75rem;
`;

/* ---------- Preview ---------- */
const PreviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 28px;
`;

const PreviewItem = styled.div`
  min-height: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 24px;
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius};
`;

const PreviewLabel = styled(Text)`
  color: ${(p) => p.theme.colors.textSecondary};
  font-weight: 500;
`;

/* ---------- Built With ---------- */
const BadgeRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-top: 24px;
`;

const TechBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 999px;
  font-size: 0.9375rem;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  background: ${(p) => p.theme.colors.cardBg};
  box-shadow: ${(p) => p.theme.shadows.soft};
  color: ${(p) => p.theme.colors.text};
`;


/* ---------- Mini Demos ---------- */
const ButtonDemo = () => (
  <Stack direction="row" gap={12} align="center" wrap>
    <Button size="small">Primary</Button>
    <Button size="small" variant="secondary">Secondary</Button>
  </Stack>
);

const CardDemo = () => (
  <Card variant="inset" padding="small" style={{ width: '100%' }}>
    <Stack direction="column" gap={6}>
      <Text size="small" weight="bold">
        Neomorphic card
      </Text>
      <Text size="small" color="textSecondary">
        Subtle shadows & soft UI
      </Text>
    </Stack>
  </Card>
);

const ModalDemo = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button size="small" onClick={() => setOpen(true)}>
        Open
      </Button>
      <Modal isOpen={open} onClose={() => setOpen(false)} title="Hello World">
        <Text>A lightweight, animated modal.</Text>
      </Modal>
    </>
  );
};

const TabsDemo = () => (
  <Tabs
    items={[
      { key: '1', label: 'Design', children: <Text size="small" color="text">Design tab</Text> },
      { key: '2', label: 'Code', children: <Text size="small" color="text">Code tab</Text> },
    ]}
    size="small"
    type="card"
  />
);

interface TableRow {
  name: string;
  role: string;
}

const TableDemo = () => {
  const data: TableRow[] = [
    { name: 'Alice', role: 'Engineer' },
    { name: 'Bob', role: 'Designer' },
  ];
  const columns = [
    { key: 'name', title: 'Name', dataIndex: 'name' as const },
    { key: 'role', title: 'Role', dataIndex: 'role' as const },
  ];
  return (
    <div style={{ width: '100%', overflow: 'auto', fontSize: '0.75rem' }}>
      <Table<TableRow> columns={columns} dataSource={data} pagination={false} size="small" bordered />
    </div>
  );
};

const InputDemo = () => (
  <Input placeholder="Type here..." inputSize="small" style={{ width: '100%' }} />
);

const ToastDemo = () => (
  <Button size="small" onClick={() => alert('Toast would appear here')}>
    Trigger
  </Button>
);

const BadgeDemo = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const placeholderColor = isDark ? 'rgba(255,255,255,0.22)' : 'rgba(0,0,0,0.22)';
  return (
    <Stack direction="row" gap={16} align="center">
      <Badge count={5}>
        <div style={{ width: 24, height: 24, borderRadius: 8, background: placeholderColor }} />
      </Badge>
      <Badge dot>
        <div style={{ width: 24, height: 24, borderRadius: 8, background: placeholderColor }} />
      </Badge>
    </Stack>
  );
};

/* ---------- Page ---------- */
const Home: React.FC = () => {
  const navigate = useNavigate();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const features = [
    {
      icon: '🧩',
      title: '80+ Components',
      desc: 'A comprehensive set of UI primitives and advanced patterns.',
    },
    {
      icon: '✨',
      title: 'Neomorphic Design',
      desc: 'Soft shadows and subtle depth for a modern tactile feel.',
    },
    {
      icon: '🎨',
      title: 'Theme Ready',
      desc: 'Light and dark modes with CSS custom properties.',
    },
    {
      icon: '🎬',
      title: 'Motion Rich',
      desc: 'Framer Motion powered animations with reduced-motion support.',
    },
    {
      icon: '📘',
      title: 'TypeScript First',
      desc: 'Fully typed components with strict generics support.',
    },
    {
      icon: '♿',
      title: 'Accessible',
      desc: 'ARIA labels, keyboard navigation, and focus management.',
    },
  ];

  const previews = [
    { label: 'Button', component: <ButtonDemo /> },
    { label: 'Card', component: <CardDemo /> },
    { label: 'Modal', component: <ModalDemo /> },
    { label: 'Tabs', component: <TabsDemo /> },
    { label: 'Table', component: <TableDemo /> },
    { label: 'Input', component: <InputDemo /> },
    { label: 'Toast', component: <ToastDemo /> },
    { label: 'Badge', component: <BadgeDemo /> },
  ];

  return (
    <HomePage>
        {/* Hero */}
        <HeroSection>
          <Hero3D />
          <HeroOverlay>
            <HeroTextCard>
              <ScrollReveal direction="up" duration={0.7}>
                <GradientTitle $isDark={isDark}>react-n-design</GradientTitle>
              </ScrollReveal>
              <ScrollReveal direction="up" delay={0.15} duration={0.7}>
                <Subtitle>
                  A modern, lightweight, and animated React component library. Built
                  with neomorphism, motion, and accessibility in mind.
                </Subtitle>
              </ScrollReveal>
              <ScrollReveal direction="up" delay={0.3} duration={0.7}>
                <CTAGroup direction="row" gap={16}>
                  <Button size="large" onClick={() => navigate('/get-started')}>
                    Get Started
                  </Button>
                  <Button size="large" variant="secondary" onClick={() => navigate('/components')}>
                    Browse Components
                  </Button>
                </CTAGroup>
              </ScrollReveal>
            </HeroTextCard>
          </HeroOverlay>
        </HeroSection>

        {/* Features */}
        <Section>
          <SectionContent>
            <ScrollReveal direction="up">
              <Title level={2} style={{ textAlign: 'center', marginBottom: 48 }}>
                Why react-n-design?
              </Title>
            </ScrollReveal>
            <FeaturesGrid>
              {features.map((f, i) => (
                <ScrollReveal key={f.title} direction="up" delay={i * 0.08}>
                  <FeatureCard variant="outset" padding="large" hoverable>
                    <FeatureIcon>{f.icon}</FeatureIcon>
                    <Title level={4}>{f.title}</Title>
                    <Text size="small" color="textSecondary">
                      {f.desc}
                    </Text>
                  </FeatureCard>
                </ScrollReveal>
              ))}
            </FeaturesGrid>
          </SectionContent>
        </Section>

        {/* Preview Grid */}
        <Section style={{ background: isDark ? 'rgba(0,0,0,0.25)' : 'rgba(0,0,0,0.03)' }}>
          <SectionContent>
            <ScrollReveal direction="up">
              <Title level={2} style={{ textAlign: 'center', marginBottom: 48 }}>
                Preview
              </Title>
            </ScrollReveal>
            <PreviewGrid>
              {previews.map((item, i) => (
                <ScrollReveal key={item.label} direction="up" delay={i * 0.06}>
                  <PreviewItem>
                    <PreviewLabel size="small" weight="medium">
                      {item.label}
                    </PreviewLabel>
                    {item.component}
                  </PreviewItem>
                </ScrollReveal>
              ))}
            </PreviewGrid>
            <ScrollReveal direction="up" delay={0.2}>
              <Stack direction="row" justify="center" style={{ marginTop: 40 }}>
                <Button size="large" onClick={() => navigate('/components')}>
                  Explore All Components
                </Button>
              </Stack>
            </ScrollReveal>
          </SectionContent>
        </Section>

        {/* Built With */}
        <Section>
          <SectionContent style={{ textAlign: 'center' }}>
            <ScrollReveal direction="up">
              <Title level={3}>Built With</Title>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.1}>
              <BadgeRow>
                <TechBadge>React 18</TechBadge>
                <TechBadge>TypeScript</TechBadge>
                <TechBadge>styled-components</TechBadge>
                <TechBadge>framer-motion</TechBadge>
              </BadgeRow>
            </ScrollReveal>
          </SectionContent>
        </Section>

    </HomePage>
  );
};

export default Home;
