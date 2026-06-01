import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import type React from 'react';
import { ThemeProvider } from 'styled-components';
import { vi } from 'vitest';
import { lightTheme } from '../../styles/theme';
import { ImageGallery } from './ImageGallery';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

const defaultImages = [
  { src: 'image1.jpg', alt: 'Image 1', caption: 'Caption 1' },
  { src: 'image2.jpg', alt: 'Image 2' },
  { src: 'image3.jpg' },
];

describe('ImageGallery', () => {
  it('renders images in a grid', () => {
    renderWithTheme(<ImageGallery images={defaultImages} />);
    expect(screen.getByAltText('Image 1')).toBeInTheDocument();
    expect(screen.getByAltText('Image 2')).toBeInTheDocument();
  });

  it('opens lightbox when an image is clicked', async () => {
    renderWithTheme(<ImageGallery images={defaultImages} />);
    const image = screen.getByAltText('Image 1');
    await userEvent.click(image);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByLabelText('Close lightbox')).toBeInTheDocument();
  });

  it('closes lightbox when close button is clicked', async () => {
    renderWithTheme(<ImageGallery images={defaultImages} />);
    await userEvent.click(screen.getByAltText('Image 1'));
    await userEvent.click(screen.getByLabelText('Close lightbox'));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes lightbox when clicking outside image', async () => {
    renderWithTheme(<ImageGallery images={defaultImages} />);
    await userEvent.click(screen.getByAltText('Image 1'));
    const dialog = screen.getByRole('dialog');
    await userEvent.click(dialog);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes lightbox on Escape key', async () => {
    renderWithTheme(<ImageGallery images={defaultImages} />);
    await userEvent.click(screen.getByAltText('Image 1'));
    await userEvent.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('shows caption in lightbox when provided', async () => {
    renderWithTheme(<ImageGallery images={defaultImages} />);
    await userEvent.click(screen.getByAltText('Image 1'));
    expect(screen.getByText('Caption 1')).toBeInTheDocument();
  });

  it('does not show caption when not provided', async () => {
    renderWithTheme(<ImageGallery images={defaultImages} />);
    await userEvent.click(screen.getByAltText('Image 2'));
    expect(screen.queryByText('Caption 1')).not.toBeInTheDocument();
  });

  it('renders with custom columns and gap', () => {
    const { container } = renderWithTheme(
      <ImageGallery images={defaultImages} columns={2} gap="24px" />
    );
    const grid = container.firstChild as HTMLElement;
    expect(grid).toHaveStyle('gap: 24px');
  });

  it('clamps columns to max 4', () => {
    const { container } = renderWithTheme(
      <ImageGallery images={defaultImages} columns={6} />
    );
    const grid = container.firstChild as HTMLElement;
    expect(grid).toHaveStyle('grid-template-columns: repeat(4, 1fr)');
  });

  it('clamps columns to min 1', () => {
    const { container } = renderWithTheme(
      <ImageGallery images={defaultImages} columns={0} />
    );
    const grid = container.firstChild as HTMLElement;
    expect(grid).toHaveStyle('grid-template-columns: repeat(1, 1fr)');
  });

  it('accepts custom className', () => {
    const { container } = renderWithTheme(
      <ImageGallery images={defaultImages} className="my-gallery" />
    );
    expect(container.firstChild).toHaveClass('my-gallery');
  });

  it('sets loading="lazy" on images', () => {
    renderWithTheme(<ImageGallery images={defaultImages} />);
    const images = screen.getAllByRole('img');
    for (const img of images) {
      expect(img).toHaveAttribute('loading', 'lazy');
    }
  });

  it('is accessible', async () => {
    const { container } = renderWithTheme(
      <ImageGallery images={defaultImages} />
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
