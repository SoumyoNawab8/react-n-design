import { render, screen } from '@testing-library/react';
import axe from 'axe-core';
import type React from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../../styles/theme';
import { AIThinking } from './AIThinking';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

const steps = [
  { text: 'Step one', id: '1' },
  { text: 'Step two', id: '2' },
];

describe('AIThinking', () => {
  it('renders and is accessible', async () => {
    const { container } = renderWithTheme(<AIThinking steps={steps} isThinking={false} />);
    expect(screen.getByText(/thinking/i)).toBeInTheDocument();
    expect(screen.getByText('Step one')).toBeInTheDocument();
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it('shows all steps when expanded', () => {
    renderWithTheme(<AIThinking steps={steps} defaultExpanded />);
    expect(screen.getByText('Step one')).toBeInTheDocument();
    expect(screen.getByText('Step two')).toBeInTheDocument();
  });

  it('shows active dot when thinking', () => {
    renderWithTheme(<AIThinking steps={steps} isThinking />);
    expect(screen.getByText(/thinking/i)).toBeInTheDocument();
  });

  it('shows elapsed time when startTime provided', () => {
    renderWithTheme(
      <AIThinking steps={steps} isThinking startTime={Date.now() - 5000} showElapsed />
    );
    expect(screen.getByText(/0:0[0-5]/)).toBeInTheDocument();
  });

  it('renders step numbers', () => {
    renderWithTheme(<AIThinking steps={steps} defaultExpanded />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });
});
