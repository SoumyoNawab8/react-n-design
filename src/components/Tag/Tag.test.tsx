import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type React from 'react';
import { FaCheck } from 'react-icons/fa';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../../styles/theme';
import { Tag } from './Tag';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

describe('Tag', () => {
  it('renders children', () => {
    renderWithTheme(<Tag>Tag Content</Tag>);
    expect(screen.getByText('Tag Content')).toBeInTheDocument();
  });

  it('renders with default variant', () => {
    renderWithTheme(<Tag>Default Tag</Tag>);
    expect(screen.getByText('Default Tag')).toBeInTheDocument();
  });

  it('renders with primary variant', () => {
    renderWithTheme(<Tag variant="primary">Primary Tag</Tag>);
    expect(screen.getByText('Primary Tag')).toBeInTheDocument();
  });

  it('renders with outline variant', () => {
    renderWithTheme(<Tag variant="outline">Outline Tag</Tag>);
    expect(screen.getByText('Outline Tag')).toBeInTheDocument();
  });

  it('renders in small size', () => {
    renderWithTheme(<Tag size="small">Small Tag</Tag>);
    expect(screen.getByText('Small Tag')).toBeInTheDocument();
  });

  it('renders in medium size', () => {
    renderWithTheme(<Tag size="medium">Medium Tag</Tag>);
    expect(screen.getByText('Medium Tag')).toBeInTheDocument();
  });

  it('renders with left icon', () => {
    renderWithTheme(
      <Tag leftIcon={<span data-testid="left-icon">★</span>}>With Icon</Tag>
    );
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    expect(screen.getByText('With Icon')).toBeInTheDocument();
  });

  it('renders with close button', () => {
    renderWithTheme(<Tag onClose={() => {}}>Closable</Tag>);
    expect(screen.getByRole('button', { name: 'Remove tag' })).toBeInTheDocument();
  });

  it('calls onClose when close button clicked', async () => {
    const onClose = vi.fn();
    renderWithTheme(<Tag onClose={onClose}>Closable</Tag>);
    const closeButton = screen.getByRole('button', { name: 'Remove tag' });
    await userEvent.click(closeButton);
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onClose with Enter key', () => {
    const onClose = vi.fn();
    renderWithTheme(<Tag onClose={onClose}>Closable</Tag>);
    const closeButton = screen.getByRole('button', { name: 'Remove tag' });
    fireEvent.keyDown(closeButton, { key: 'Enter' });
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onClose with Space key', () => {
    const onClose = vi.fn();
    renderWithTheme(<Tag onClose={onClose}>Closable</Tag>);
    const closeButton = screen.getByRole('button', { name: 'Remove tag' });
    fireEvent.keyDown(closeButton, { key: ' ' });
    expect(onClose).toHaveBeenCalled();
  });

  it('prevents propagation on close', async () => {
    const onClose = vi.fn();
    const parentOnClick = vi.fn();
    renderWithTheme(
      <span onClick={parentOnClick}>
        <Tag onClose={onClose}>Closable</Tag>
      </span>
    );
    const closeButton = screen.getByRole('button', { name: 'Remove tag' });
    await userEvent.click(closeButton);
    expect(onClose).toHaveBeenCalled();
    expect(parentOnClick).not.toHaveBeenCalled();
  });

  it('renders with custom color', () => {
    renderWithTheme(<Tag color="#ff0000">Red Tag</Tag>);
    expect(screen.getByText('Red Tag')).toBeInTheDocument();
  });

  it('forwards additional props', () => {
    renderWithTheme(<Tag data-testid="my-tag" className="custom-class">Tagged</Tag>);
    const tag = screen.getByTestId('my-tag');
    expect(tag).toHaveClass('custom-class');
  });

  it('renders without onClose button', () => {
    renderWithTheme(<Tag>No Close Button</Tag>);
    expect(screen.queryByRole('button', { name: 'Remove tag' })).not.toBeInTheDocument();
  });

  it('has correct close button accessibility', () => {
    renderWithTheme(<Tag onClose={() => {}}>Closable</Tag>);
    const closeButton = screen.getByRole('button', { name: 'Remove tag' });
    expect(closeButton).toHaveAttribute('tabIndex', '0');
  });

  it('renders tag as span element', () => {
    renderWithTheme(<Tag data-testid="tag-element">Tag</Tag>);
    const tag = screen.getByTestId('tag-element');
    expect(tag.tagName).toBe('SPAN');
  });

  it('renders all combined props', () => {
    renderWithTheme(
      <Tag variant="primary" size="small" color="#000" leftIcon={<span>★</span>} onClose={() => {}}>
        Combined
      </Tag>
    );
    expect(screen.getByText('Combined')).toBeInTheDocument();
  });

  it('close button is focusable', () => {
    renderWithTheme(<Tag onClose={() => {}}>Closable</Tag>);
    const closeButton = screen.getByRole('button', { name: 'Remove tag' });
    expect(closeButton).toHaveFocus();
  });

  it('renders with react icon as left icon', () => {
    renderWithTheme(
      <Tag leftIcon={<FaCheck data-testid="check-icon" />}>Checked</Tag>
    );
    expect(screen.getByTestId('check-icon')).toBeInTheDocument();
  });
});
