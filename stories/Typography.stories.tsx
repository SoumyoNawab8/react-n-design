import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Text } from '../src/components/Typography/Text';
import { Title } from '../src/components/Typography/Title';
import { Paragraph } from '../src/components/Typography/Paragraph';

const meta: Meta<typeof Text> = {
  title: 'react-n-design/Typography',
  tags: ['autodocs'],
};
export default meta;

export const TextDefault: StoryObj<typeof Text> = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Text size="small">Small text</Text>
      <Text size="medium">Medium text (default)</Text>
      <Text size="large">Large text</Text>
      <Text weight="bold">Bold text</Text>
      <Text color="#6d5dfc">Custom colored text</Text>
      <Text truncate style={{ maxWidth: 200 }}>
        This is a very long text that should be truncated with ellipsis.
      </Text>
    </div>
  ),
};

export const TitleLevels: StoryObj<typeof Title> = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Title level={1}>Title Level 1</Title>
      <Title level={2}>Title Level 2</Title>
      <Title level={3}>Title Level 3</Title>
      <Title level={4}>Title Level 4</Title>
      <Title level={5}>Title Level 5</Title>
      <Title level={2} color="#6d5dfc">Colored Title</Title>
    </div>
  ),
};

export const ParagraphSizes: StoryObj<typeof Paragraph> = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Paragraph size="small">
        Small paragraph: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Paragraph>
      <Paragraph size="medium">
        Medium paragraph: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Paragraph>
      <Paragraph size="large">
        Large paragraph: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Paragraph>
      <Paragraph maxLines={2}>
        MaxLines paragraph: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </Paragraph>
    </div>
  ),
};
