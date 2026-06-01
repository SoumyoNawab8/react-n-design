import type { Meta, StoryObj } from '@storybook/react';
import { ImageGallery } from '../src/components/ImageGallery';

const meta: Meta<typeof ImageGallery> = {
  title: 'Data Display / ImageGallery',
  component: ImageGallery,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A responsive image gallery with lightbox modal, lazy loading, and keyboard accessibility. Click any image to open the lightbox.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    images: { control: 'object' },
    columns: { control: { type: 'number', min: 1, max: 4 } },
    gap: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const demoImages = [
  { src: 'https://picsum.photos/id/10/800/600', alt: 'Forest path', caption: 'A quiet forest path in autumn.' },
  { src: 'https://picsum.photos/id/11/800/600', alt: 'Coastline', caption: 'Rocky coastline at sunset.' },
  { src: 'https://picsum.photos/id/12/800/600', alt: 'Mountains', caption: 'Snow-capped mountain peaks.' },
  { src: 'https://picsum.photos/id/13/800/600', alt: 'Lake', caption: 'Crystal clear alpine lake.' },
  { src: 'https://picsum.photos/id/14/800/600', alt: 'Waterfall', caption: 'Misty waterfall in the jungle.' },
  { src: 'https://picsum.photos/id/15/800/600', alt: 'City lights', caption: 'City skyline at blue hour.' },
];

export const Default: Story = {
  args: {
    images: demoImages,
    columns: 3,
    gap: '16px',
  },
};

export const TwoColumns: Story = {
  args: {
    images: demoImages,
    columns: 2,
    gap: '16px',
  },
};

export const FourColumns: Story = {
  args: {
    images: demoImages,
    columns: 4,
    gap: '12px',
  },
};

export const SingleImage: Story = {
  args: {
    images: [demoImages[0]],
    columns: 1,
  },
};

export const NoCaptions: Story = {
  args: {
    images: demoImages.map((img) => ({ src: img.src, alt: img.alt })),
    columns: 3,
    gap: '16px',
  },
};

export const NarrowGap: Story = {
  args: {
    images: demoImages,
    columns: 3,
    gap: '4px',
  },
};
