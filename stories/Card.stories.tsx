import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../src/components/Button';
import { Card } from '../src/components/Card';

const meta: Meta<typeof Card> = {
  title: 'react-n-design/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['outset', 'inset', 'glass', 'elevated'] },
    padding: { control: 'object' },
    bordered: { control: 'boolean' },
    hoverable: { control: 'boolean' },
    loading: { control: 'boolean' },
    shimmer: { control: 'boolean' },
    coverAspectRatio: { control: 'select', options: ['16/9', '4/3', '1/1'] },
    entrance: { control: 'select', options: ['none', 'fade', 'slide-up', 'scale'] },
  },
};
export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: 'This is the basic card content.',
  },
};

export const WithHeaderAndFooter: Story = {
  args: {
    header: 'Card Title',
    children: 'This is the main content area, sitting between the header and footer.',
    footer: <Button size="small">Action</Button>,
  },
};

export const WithCoverImage: Story = {
  args: {
    padding: 'medium',
    cover: <img alt="example" src="https://picsum.photos/id/12/400/200" />,
    header: 'Europe Street',
    children: 'A neomorphic card with a cover image is great for articles or posts.',
  },
};

export const WithCoverAspectRatio: Story = {
  args: {
    padding: 'medium',
    coverAspectRatio: '16/9',
    cover: <img alt="example" src="https://picsum.photos/id/16/800/450" />,
    header: 'Responsive Image',
    children: 'This card uses a 16:9 aspect ratio for the cover image.',
  },
};

export const Hoverable: Story = {
  args: {
    hoverable: true,
    bordered: true,
    children: 'This card lifts up when you hover over it with a spring physics effect.',
  },
};

export const LoadingState: Story = {
  args: {
    loading: true,
    header: 'Loading Content...',
    children: 'This content is blurred while the spinner is active.',
  },
};

export const ShimmerLoading: Story = {
  args: {
    shimmer: true,
    header: 'Shimmer Loading',
    children: 'This content shows a shimmer effect while loading.',
  },
};

export const GlassVariant: Story = {
  args: {
    variant: 'glass',
    bordered: true,
    children: 'This is a glassmorphism card with backdrop blur and subtle transparency.',
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};

export const ElevatedVariant: Story = {
  args: {
    variant: 'elevated',
    hoverable: true,
    children: 'This card has stronger shadows and more elevation than the default variant.',
  },
};

export const FadeEntrance: Story = {
  args: {
    entrance: 'fade',
    header: 'Fade In',
    children: 'This card fades in when it enters the view.',
  },
};

export const SlideUpEntrance: Story = {
  args: {
    entrance: 'slide-up',
    header: 'Slide Up',
    children: 'This card slides up and fades in with a nice spring animation.',
  },
};

export const ScaleEntrance: Story = {
  args: {
    entrance: 'scale',
    header: 'Scale In',
    children: 'This card scales in from 95% with a smooth animation.',
  },
};

export const ResponsivePadding: Story = {
  args: {
    padding: { xs: 'small', md: 'medium', lg: 'large' },
    header: 'Responsive Padding',
    children: 'This card has different padding at different breakpoints. Resize your browser to see the effect.',
  },
};

export const CompleteCard: Story = {
  args: {
    variant: 'glass',
    bordered: true,
    hoverable: true,
    entrance: 'slide-up',
    coverAspectRatio: '16/9',
    cover: <img alt="landscape" src="https://picsum.photos/id/28/800/450" />,
    header: 'Complete Card Example',
    children: 'This card showcases all the new features: glass variant, hover effect, entrance animation, and responsive cover aspect ratio.',
    footer: (<div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
      <Button size="small" variant="secondary">Cancel</Button>
      <Button size="small">Confirm</Button>
    </div>),
  },
  parameters: {
    backgrounds: {
      default: 'gradient',
    },
    docs: {
      description: {
        story: 'A complete example using all the new Card v1.2.0 features.',
      },
    },
  },
};
