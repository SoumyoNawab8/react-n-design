import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Carousel } from '../src/components/Carousel';
import { Card } from '../src/components/Card';

const meta: Meta<typeof Carousel> = {
  title: 'react-n-design/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  argTypes: {
    autoPlay: { control: 'boolean' },
    autoPlayInterval: { control: 'number' },
    showDots: { control: 'boolean' },
    showNav: { control: 'boolean' },
    showCounter: { control: 'boolean' },
    loop: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<typeof Carousel>;

const slides = [
  <Card key={1} header="Slide 1" style={{ minHeight: 160, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    First slide content
  </Card>,
  <Card key={2} header="Slide 2" style={{ minHeight: 160, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    Second slide content
  </Card>,
  <Card key={3} header="Slide 3" style={{ minHeight: 160, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    Third slide content
  </Card>,
];

export const Default: Story = {
  args: {
    children: slides,
  },
};

export const AutoPlay: Story = {
  args: {
    children: slides,
    autoPlay: true,
    autoPlayInterval: 2000,
  },
};

export const Loop: Story = {
  args: {
    children: slides,
    loop: true,
  },
};

export const NoDots: Story = {
  args: {
    children: slides,
    showDots: false,
  },
};

export const NoNav: Story = {
  args: {
    children: slides,
    showNav: false,
  },
};

export const WithCounter: Story = {
  args: {
    children: slides,
    showCounter: true,
  },
};
