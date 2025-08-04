import React, { useState, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from '../src/components/Skeleton';
import { Card } from '../src/components/Card';

const meta: Meta<typeof Skeleton> = {
  title: 'react-n-design/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'radio', options: ['text', 'rect', 'circle'] },
    width: { control: 'text' },
    height: { control: 'text' },
    active: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Text: Story = {
  args: {
    variant: 'text',
    width: '80%',
  },
};

export const Circle: Story = {
  args: {
    variant: 'circle',
    width: '50px',
    height: '50px',
  },
};

export const Rectangle: Story = {
  args: {
    variant: 'rect',
    width: '100%',
    height: '100px',
  },
};

export const ProfileCardPreview: Story = {
  render: function ProfilePreview() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => setLoading(false), 3000);
      return () => clearTimeout(timer);
    }, []);

    return (
      <Card style={{ maxWidth: '300px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Skeleton loading={loading} variant="circle" width={50} height={50}>
            <img 
              src="https://i.pravatar.cc/50" 
              alt="avatar" 
              style={{ borderRadius: '50%' }} 
            />
          </Skeleton>
          <div style={{ width: '100%' }}>
            <Skeleton loading={loading} variant="text" width="70%">
              <h3 style={{ margin: 0 }}>User Name</h3>
            </Skeleton>
          </div>
        </div>
        <div style={{ marginTop: '16px' }}>
          <Skeleton loading={loading} variant="text" />
          <Skeleton loading={loading} variant="text" width="90%" style={{ marginTop: '8px' }}/>
          <Skeleton loading={loading} variant="text" width="60%" style={{ marginTop: '8px' }}/>
        </div>
      </Card>
    );
  },
};