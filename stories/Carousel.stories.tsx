import type { Meta, StoryObj } from '@storybook/react';
import { Carousel } from '../src/components/Carousel';

const meta: Meta<typeof Carousel> = {
  title: 'react-n-design/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  argTypes: {
    autoPlay: { control: 'boolean' },
    autoPlayInterval: { control: { type: 'range', min: 1000, max: 10000, step: 500 } },
    showDots: { control: 'boolean' },
    showNav: { control: 'boolean' },
    showCounter: { control: 'boolean' },
    showThumbnails: { control: 'boolean' },
    loop: { control: 'boolean' },
    enableSwipe: { control: 'boolean' },
    height: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<typeof Carousel>;

// Sample image slides for demo
const imageSlides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
    title: 'Mountain Adventure',
    description: 'Explore the majestic peaks and breathtaking views of the alpine wilderness.',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=800&fit=crop',
    title: 'Ocean Serenity',
    description: 'Discover the calm and beauty of pristine coastal landscapes.',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1200&h=800&fit=crop',
    title: 'Urban Discovery',
    description: 'Experience the vibrant energy and architecture of modern cities.',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1200&h=800&fit=crop',
    title: 'Forest Retreat',
    description: 'Immerse yourself in the tranquility of ancient woodlands.',
  },
];

export const Default: Story = {
  args: {
    items: imageSlides,
    showDots: true,
    showNav: true,
    showCounter: false,
    loop: false,
  },
};

export const AutoPlay: Story = {
  args: {
    items: imageSlides,
    autoPlay: true,
    autoPlayInterval: 4000,
    showDots: true,
    showNav: true,
    showCounter: false,
    loop: true,
  },
};

export const Loop: Story = {
  args: {
    items: imageSlides,
    loop: true,
  },
};

export const NoDots: Story = {
  args: {
    items: imageSlides,
    showDots: false,
  },
};

export const NoNav: Story = {
  args: {
    items: imageSlides,
    showNav: false,
  },
};

export const WithCounter: Story = {
  args: {
    items: imageSlides,
    showCounter: true,
  },
};

export const WithThumbnails: Story = {
  args: {
    items: imageSlides,
    showThumbnails: true,
    showDots: true,
  },
};

export const CustomHeight: Story = {
  args: {
    items: imageSlides,
    height: '500px',
  },
};

export const Minimal: Story = {
  args: {
    items: [
      { id: 1, image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600' },
      { id: 2, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600' },
      { id: 3, image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=600' },
    ],
    showDots: false,
    showNav: false,
    showCounter: false,
    autoPlay: true,
    autoPlayInterval: 3000,
    loop: true,
  },
};
