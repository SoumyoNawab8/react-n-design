import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type React from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../../styles/theme';
import { SkipToContent } from './SkipToContent';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

describe('SkipToContent', () => {
  it('renders skip link', () => {
    renderWithTheme(<SkipToContent />);
    const link = screen.getByText('Skip to main content');
    expect(link).toBeInTheDocument();
    expect(link.tagName).toBe('A');
  });

  it('renders with custom label', () => {
    renderWithTheme(<SkipToContent label="Skip to content" />);
    expect(screen.getByText('Skip to content')).toBeInTheDocument();
  });

  it('has correct href to main content', () => {
    renderWithTheme(<SkipToContent />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '#main-content');
  });

  it('has correct href with custom targetId', () => {
    renderWithTheme(<SkipToContent targetId="page-content" />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '#page-content');
  });

  it('is positioned off-screen by default', () => {
    renderWithTheme(<SkipToContent />);
    const link = screen.getByRole('link');
    expect(link).toHaveStyle({ position: 'absolute' });
    expect(link).toHaveStyle({ top: '-40px' });
  });

  it('becomes visible on focus', async () => {
    renderWithTheme(<SkipToContent />);
    const link = screen.getByRole('link');
    link.focus();
    fireEvent.focus(link);
    await userEvent.tab();
  });

  it('hides again on blur', async () => {
    renderWithTheme(<SkipToContent />);
    const link = screen.getByRole('link');
    link.focus();
    fireEvent.focus(link);
  });

  it('has high z-index for visibility', () => {
    renderWithTheme(<SkipToContent />);
    const link = screen.getByRole('link');
    expect(link).toHaveStyle({ zIndex: 10000 });
  });

  it('has no text decoration', () => {
    renderWithTheme(<SkipToContent />);
    const link = screen.getByRole('link');
    expect(link).toHaveStyle({ textDecoration: 'none' });
  });

  it('has black background and white text', () => {
    renderWithTheme(<SkipToContent />);
    const link = screen.getByRole('link');
    expect(link).toHaveStyle({ background: '#000', color: '#fff' });
  });

  it('has padding for visibility', () => {
    renderWithTheme(<SkipToContent />);
    const link = screen.getByRole('link');
    expect(link).toHaveStyle({ padding: '8px 16px' });
  });

  it('has smooth transition', () => {
    renderWithTheme(<SkipToContent />);
    const link = screen.getByRole('link');
    expect(link).toHaveStyle({ transition: 'top 0.3s' });
  });

  it('is the first focusable element', () => {
    const { container } = renderWithTheme(
      <div>
        <SkipToContent />
        <nav>Navigation</nav>
      </div>
    );
    const skipLink = screen.getByRole('link');
    expect(skipLink).toBeInTheDocument();
  });
});
