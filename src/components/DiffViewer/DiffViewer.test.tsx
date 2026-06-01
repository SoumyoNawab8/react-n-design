import { render, screen } from '@testing-library/react';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../../styles/theme';
import { DiffViewer } from './DiffViewer';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

const oldValue = `line 1
line 2
line 3`;

const newValue = `line 1
modified line 2
line 3
line 4`;

describe('DiffViewer', () => {
  describe('Split mode', () => {
    it('renders split mode by default', () => {
      renderWithTheme(<DiffViewer oldValue={oldValue} newValue={newValue} />);
      expect(screen.getByRole('region', { name: /diff viewer/i })).toBeInTheDocument();
      expect(screen.getAllByText('Old').length).toBeGreaterThan(0);
      expect(screen.getAllByText('New').length).toBeGreaterThan(0);
    });

    it('shows unchanged lines in normal color', () => {
      renderWithTheme(<DiffViewer oldValue={oldValue} newValue={newValue} />);
      expect(screen.getAllByText('line 1').length).toBeGreaterThanOrEqual(2);
      expect(screen.getAllByText('line 3').length).toBeGreaterThanOrEqual(2);
    });

    it('shows removed lines on left', () => {
      renderWithTheme(<DiffViewer oldValue={oldValue} newValue={newValue} mode="split" />);
      expect(screen.getByText('line 2')).toBeInTheDocument();
    });

    it('shows added lines on right', () => {
      renderWithTheme(<DiffViewer oldValue={oldValue} newValue={newValue} mode="split" />);
      expect(screen.getByText('line 4')).toBeInTheDocument();
    });

    it('shows modified lines in both columns', () => {
      renderWithTheme(<DiffViewer oldValue={oldValue} newValue={newValue} mode="split" />);
      expect(screen.getByText('line 2')).toBeInTheDocument();
      expect(screen.getByText('modified line 2')).toBeInTheDocument();
    });
  });

  describe('Unified mode', () => {
    it('renders unified mode', () => {
      renderWithTheme(<DiffViewer oldValue={oldValue} newValue={newValue} mode="unified" />);
      expect(screen.getByRole('region', { name: /diff viewer/i })).toBeInTheDocument();
      expect(screen.getByText('Unified Diff')).toBeInTheDocument();
    });

    it('prefixes removed lines with -', () => {
      renderWithTheme(<DiffViewer oldValue={oldValue} newValue={newValue} mode="unified" />);
      expect(screen.getByText('- line 2')).toBeInTheDocument();
    });

    it('prefixes added lines with +', () => {
      renderWithTheme(<DiffViewer oldValue={oldValue} newValue={newValue} mode="unified" />);
      expect(screen.getByText('+ modified line 2')).toBeInTheDocument();
      expect(screen.getByText('+ line 4')).toBeInTheDocument();
    });
  });

  describe('Customization', () => {
    it('applies custom className', () => {
      const { container } = renderWithTheme(
        <DiffViewer oldValue="a" newValue="b" className="my-diff" />
      );
      expect(container.firstChild).toHaveClass('my-diff');
    });
  });

  describe('Edge cases', () => {
    it('handles empty strings', () => {
      renderWithTheme(<DiffViewer oldValue="" newValue="" />);
      expect(screen.getByRole('region')).toBeInTheDocument();
    });

    it('handles all new lines', () => {
      renderWithTheme(<DiffViewer oldValue="" newValue="line1\nline2" />);
      expect(screen.getByText(/line1/)).toBeInTheDocument();
      expect(screen.getByText(/line2/)).toBeInTheDocument();
    });

    it('handles all removed lines', () => {
      renderWithTheme(<DiffViewer oldValue="line1\nline2" newValue="" />);
      expect(screen.getByText(/line1/)).toBeInTheDocument();
      expect(screen.getByText(/line2/)).toBeInTheDocument();
    });
  });
});
