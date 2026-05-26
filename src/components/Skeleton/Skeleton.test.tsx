import { render, screen } from '@testing-library/react';
import type React from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../../styles/theme';
import { Skeleton } from './Skeleton';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

describe('Skeleton', () => {
  it('renders skeleton placeholder when loading', () => {
    renderWithTheme(<Skeleton loading />);
    const skeleton = screen.getByRole('status');
    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveAttribute('aria-busy', 'true');
    expect(skeleton).toHaveAttribute('aria-live', 'polite');
    expect(skeleton).toHaveAttribute('aria-label', 'Loading content');
  });

  it('renders children when not loading', () => {
    renderWithTheme(
      <Skeleton loading={false}>
        <div data-testid="content">Loaded content</div>
      </Skeleton>
    );
    expect(screen.getByTestId('content')).toBeInTheDocument();
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('renders by default when loading prop is omitted', () => {
    renderWithTheme(<Skeleton />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders with text variant by default', () => {
    renderWithTheme(<Skeleton loading />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders with rect variant', () => {
    renderWithTheme(<Skeleton loading variant="rect" />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders with circle variant', () => {
    renderWithTheme(<Skeleton loading variant="circle" />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders with custom width', () => {
    renderWithTheme(<Skeleton loading width="200px" />);
    const skeleton = screen.getByRole('status');
    expect(skeleton).toHaveStyle({ width: '200px' });
  });

  it('renders with custom height', () => {
    renderWithTheme(<Skeleton loading height="100px" />);
    const skeleton = screen.getByRole('status');
    expect(skeleton).toHaveStyle({ height: '100px' });
  });

  it('renders with active animation when active', () => {
    renderWithTheme(<Skeleton loading active />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders without animation when active is false', () => {
    renderWithTheme(<Skeleton loading active={false} />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders children correctly when loading is false', () => {
    renderWithTheme(
      <Skeleton loading={false}>
        <p>Content is ready</p>
      </Skeleton>
    );
    expect(screen.getByText('Content is ready')).toBeInTheDocument();
  });

  it('renders with numeric width', () => {
    renderWithTheme(<Skeleton loading width={300} />);
    const skeleton = screen.getByRole('status');
    expect(skeleton).toHaveStyle({ width: 300 });
  });

  it('renders with numeric height', () => {
    renderWithTheme(<Skeleton loading height={50} />);
    const skeleton = screen.getByRole('status');
    expect(skeleton).toHaveStyle({ height: 50 });
  });

  it('renders with complex children structure', () => {
    renderWithTheme(
      <Skeleton loading={false}>
        <div>
          <h1>Title</h1>
          <p>Description</p>
          <button>Action</button>
        </div>
      </Skeleton>
    );
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('has correct accessibility attributes', () => {
    renderWithTheme(<Skeleton loading />);
    const skeleton = screen.getByRole('status');
    expect(skeleton).toHaveAttribute('aria-busy');
    expect(skeleton).toHaveAttribute('aria-live');
    expect(skeleton).toHaveAttribute('aria-label');
  });

  it('renders circle variant with proper styling', () => {
    renderWithTheme(<Skeleton loading variant="circle" width={48} height={48} />);
    const skeleton = screen.getByRole('status');
    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveStyle({ width: 48, height: 48 });
  });

  it('renders multiple skeleton placeholders', () => {
    renderWithTheme(
      <div>
        <Skeleton loading variant="text" />
        <Skeleton loading variant="rect" />
        <Skeleton loading variant="circle" />
      </div>
    );
    const skeletons = screen.getAllByRole('status');
    expect(skeletons).toHaveLength(3);
  });

  it('transitions from loading to loaded state', () => {
    const { rerender } = renderWithTheme(
      <Skeleton loading>
        <div data-testid="content">Content</div>
      </Skeleton>
    );
    expect(screen.getByRole('status')).toBeInTheDocument();

    rerender(
      <ThemeProvider theme={lightTheme}>
        <Skeleton loading={false}>
          <div data-testid="content">Content</div>
        </Skeleton>
      </ThemeProvider>
    );
    expect(screen.getByTestId('content')).toBeInTheDocument();
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('renders with all props combined', () => {
    renderWithTheme(
      <Skeleton loading variant="rect" width="200px" height="100px" active={false} />
    );
    const skeleton = screen.getByRole('status');
    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveStyle({ width: '200px', height: '100px' });
  });

  it('renders text children when not loading', () => {
    renderWithTheme(<Skeleton loading={false}>Just text</Skeleton>);
    expect(screen.getByText('Just text')).toBeInTheDocument();
  });
});
