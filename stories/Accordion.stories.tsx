import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Accordion, AccordionItemProps } from '../src/components/Accordion';

const meta: Meta<typeof Accordion> = {
  title: 'react-n-design/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  argTypes: {
    allowMultiple: { control: 'boolean' },
    bordered: { control: 'boolean' },
  },
};
export default meta;

const sampleItems: AccordionItemProps[] = [
  {
    key: '1',
    label: 'Panel 1: Introduction',
    children: 'This is the content for the first panel. It introduces the accordion component.',
  },
  {
    key: '2',
    label: 'Panel 2: Features',
    children: 'This panel describes the features, such as single and multiple open modes.',
  },
  {
    key: '3',
    label: 'Panel 3: Disabled Panel',
    children: 'This content should not be visible as the panel is disabled.',
    disabled: true,
  },
];

export const Default: StoryObj<typeof Accordion> = {
  args: {
    items: sampleItems,
    defaultActiveKey: '1',
  },
};

export const AllowMultiple: StoryObj<typeof Accordion> = {
  args: {
    items: sampleItems,
    allowMultiple: true,
    defaultActiveKey: ['1', '2'],
  },
};

export const Borderless: StoryObj<typeof Accordion> = {
  args: {
    items: sampleItems,
    bordered: false,
  },
};

export const Controlled: StoryObj<typeof Accordion> = {
  render: function ControlledAccordion() {
    const [activeKeys, setActiveKeys] = useState<string[]>(['1']);

    const handleChange = (keys: string | string[]) => {
      // Because this story's accordion has allowMultiple, we expect an array
      setActiveKeys(keys as string[]);
    };

    return (
      <div>
        <p>
          Manually opened panels: <strong>{activeKeys.join(', ') || 'None'}</strong>
        </p>
        <Accordion
          items={sampleItems}
          activeKey={activeKeys}
          onChange={handleChange}
          allowMultiple
        />
      </div>
    );
  },
};