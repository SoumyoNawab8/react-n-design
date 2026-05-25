import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Tour } from '../src/components/Tour';

const meta: Meta<typeof Tour> = {
  title: 'react-n-design/Tour',
  component: Tour,
  tags: ['autodocs'],
  argTypes: {
    steps: {
      description: 'Array of tour steps with target, title, description, and optional placement',
    },
    open: {
      control: 'boolean',
      description: 'Whether the tour is visible',
    },
    onClose: {
      description: 'Callback function when tour is closed or skipped',
      action: 'closed',
    },
    onFinish: {
      description: 'Callback function when tour is completed',
      action: 'finished',
    },
  },
};
export default meta;
type Story = StoryObj<typeof Tour>;

const defaultSteps = [
  {
    target: '.demo-button-1',
    title: 'Welcome',
    description: 'This is the first step of your tour. Click Next to continue.',
    placement: 'bottom' as const,
  },
  {
    target: '.demo-button-2',
    title: 'Second Step',
    description: 'This is another feature you should know about.',
    placement: 'top' as const,
  },
  {
    target: '.demo-button-3',
    title: 'Final Step',
    description: 'You have reached the end of the tour!',
    placement: 'right' as const,
  },
];

const TourWithContainer = ({ open, steps }: { open: boolean; steps: typeof defaultSteps }) => {
  const [isOpen, setIsOpen] = useState(open);
  
  return (
    <div style={{ padding: '200px', height: '500px', position: 'relative' }}>
      <div style={{ display: 'flex', gap: '100px', alignItems: 'center', justifyContent: 'center' }}>
        <button className="demo-button-1" style={{ padding: '12px 24px', borderRadius: '8px' }}>
          Button 1
        </button>
        <button className="demo-button-2" style={{ padding: '12px 24px', borderRadius: '8px' }}>
          Button 2
        </button>
        <button className="demo-button-3" style={{ padding: '12px 24px', borderRadius: '8px' }}>
          Button 3
        </button>
      </div>
      <Tour 
        steps={steps} 
        open={isOpen} 
        onClose={() => setIsOpen(false)} 
        onFinish={() => {
          console.log('Tour finished');
          setIsOpen(false);
        }} 
      />
    </div>
  );
};

export const Default: Story = {
  render: () => <TourWithContainer open={true} steps={defaultSteps} />,
};

export const SingleStep: Story = {
  render: () => (
    <TourWithContainer 
      open={true} 
      steps={[
        {
          target: '.demo-button-1',
          title: 'Getting Started',
          description: 'Welcome to the application! This is a quick introduction.',
          placement: 'bottom',
        },
      ]} 
    />
  ),
};

export const DifferentPlacements: Story = {
  render: () => (
    <TourWithContainer 
      open={true} 
      steps={[
        {
          target: '.demo-button-1',
          title: 'Top Placement',
          description: 'This card appears above the target.',
          placement: 'top',
        },
        {
          target: '.demo-button-2',
          title: 'Left Placement',
          description: 'This card appears to the left of the target.',
          placement: 'left',
        },
        {
          target: '.demo-button-3',
          title: 'Right Placement',
          description: 'This card appears to the right of the target.',
          placement: 'right',
        },
      ]} 
    />
  ),
};

export const LongTour: Story = {
  render: () => (
    <TourWithContainer 
      open={true} 
      steps={[
        ...defaultSteps,
        {
          target: '.demo-button-1',
          title: 'Return to Start',
          description: 'Here we are back at the beginning.',
          placement: 'bottom',
        },
        {
          target: '.demo-button-2',
          title: 'Check this out',
          description: 'A longer tour with more steps.',
          placement: 'left',
        },
      ]} 
    />
  ),
};
