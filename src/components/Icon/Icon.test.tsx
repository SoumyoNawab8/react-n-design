import { render, screen } from '@testing-library/react';
import type React from 'react';
import { FaStar } from 'react-icons/fa';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../../styles/theme';
import { Icon } from './Icon';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

describe('Icon', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders with icon prop', () => {
    renderWithTheme(<Icon icon={FaStar} size={24} />);
    expect(document.querySelector('svg')).toBeInTheDocument();
  });

  it('renders with predefined name', () => {
    renderWithTheme(<Icon name="star" size={24} />);
    expect(document.querySelector('svg')).toBeInTheDocument();
  });

  it('warns when name is not found', () => {
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    renderWithTheme(<Icon name="nonexistent" />);
    expect(consoleSpy).toHaveBeenCalledWith('Icon: No icon found for name "nonexistent"');
  });

  it('renders with custom size', () => {
    renderWithTheme(<Icon icon={FaStar} size={48} />);
    const icon = document.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  it('renders with custom color', () => {
    renderWithTheme(<Icon icon={FaStar} color="#ff0000" />);
    expect(document.querySelector('svg')).toBeInTheDocument();
  });

  it('renders with circle variant', () => {
    renderWithTheme(<Icon icon={FaStar} variant="circle" />);
    const container = document.querySelector('[data-variant="circle"]');
    expect(container).toBeTruthy();
  });

  it('renders with square variant', () => {
    renderWithTheme(<Icon icon={FaStar} variant="square" />);
    const container = document.querySelector('[data-variant="square"]');
    expect(container).toBeTruthy();
  });

  it('applies custom className', () => {
    renderWithTheme(<Icon icon={FaStar} className="custom-icon" />);
    const container = screen.getByRole('img');
    expect(container).toHaveClass('custom-icon');
  });

  it('renders with aria-label', () => {
    renderWithTheme(<Icon icon={FaStar} ariaLabel="Favorite star" />);
    expect(screen.getByLabelText('Favorite star')).toBeInTheDocument();
  });

  it('renders with default size 24', () => {
    renderWithTheme(<Icon icon={FaStar} />);
    expect(document.querySelector('svg')).toBeInTheDocument();
  });

  it('renders all predefined icons', () => {
    const iconNames = ['home', 'user', 'search', 'check', 'times', 'arrow-right', 'star', 'heart'];
    iconNames.forEach((name) => {
      const { rerender } = renderWithTheme(<Icon name={name} />);
      expect(document.querySelector('svg')).toBeInTheDocument();
      rerender(
        <ThemeProvider theme={lightTheme}>
          <Icon name={name} />
        </ThemeProvider>
      );
    });
  });

  it('renders with bell icon', () => {
    renderWithTheme(<Icon name="bell" />);
    expect(document.querySelector('svg')).toBeInTheDocument();
  });

  it('renders with cog icon', () => {
    renderWithTheme(<Icon name="cog" />);
    expect(document.querySelector('svg')).toBeInTheDocument();
  });

  it('renders with trash icon', () => {
    renderWithTheme(<Icon name="trash" />);
    expect(document.querySelector('svg')).toBeInTheDocument();
  });

  it('renders with edit icon', () => {
    renderWithTheme(<Icon name="edit" />);
    expect(document.querySelector('svg')).toBeInTheDocument();
  });

  it('renders with plus icon', () => {
    renderWithTheme(<Icon name="plus" />);
    expect(document.querySelector('svg')).toBeInTheDocument();
  });

  it('renders with eye icon', () => {
    renderWithTheme(<Icon name="eye" />);
    expect(document.querySelector('svg')).toBeInTheDocument();
  });

  it('renders with upload icon', () => {
    renderWithTheme(<Icon name="upload" />);
    expect(document.querySelector('svg')).toBeInTheDocument();
  });

  it('renders with download icon', () => {
    renderWithTheme(<Icon name="download" />);
    expect(document.querySelector('svg')).toBeInTheDocument();
  });

  it('renders with lock icon', () => {
    renderWithTheme(<Icon name="lock" />);
    expect(document.querySelector('svg')).toBeInTheDocument();
  });

  it('renders with calendar icon', () => {
    renderWithTheme(<Icon name="calendar" />);
    expect(document.querySelector('svg')).toBeInTheDocument();
  });

  it('renders with info icon', () => {
    renderWithTheme(<Icon name="info" />);
    expect(document.querySelector('svg')).toBeInTheDocument();
  });

  it('renders with warning icon', () => {
    renderWithTheme(<Icon name="warning" />);
    expect(document.querySelector('svg')).toBeInTheDocument();
  });

  it('renders with spinner icon', () => {
    renderWithTheme(<Icon name="spinner" />);
    expect(document.querySelector('svg')).toBeInTheDocument();
  });

  it('returns null when no icon provided', () => {
    const { container } = renderWithTheme(<Icon />);
    expect(container.firstChild).toBeNull();
  });

  it('renders with envelope icon', () => {
    renderWithTheme(<Icon name="envelope" />);
    expect(document.querySelector('svg')).toBeInTheDocument();
  });
});
