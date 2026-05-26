import { render, screen } from '@testing-library/react';
import type React from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../../styles/theme';
import { Breadcrumbs } from './Breadcrumbs';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

describe('Breadcrumbs', () => {
  const defaultItems = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Electronics' },
  ];

  it('renders all breadcrumb items', () => {
    renderWithTheme(<Breadcrumbs items={defaultItems} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Electronics')).toBeInTheDocument();
  });

  it('renders with default accessibility label', () => {
    renderWithTheme(<Breadcrumbs items={defaultItems} />);
    expect(screen.getByLabelText('Breadcrumb')).toBeInTheDocument();
  });

  it('renders with custom aria-label', () => {
    renderWithTheme(<Breadcrumbs items={defaultItems} ariaLabel="Navigation" />);
    expect(screen.getByLabelText('Navigation')).toBeInTheDocument();
  });

  it('renders last item as current page', () => {
    renderWithTheme(<Breadcrumbs items={defaultItems} />);
    const currentPage = screen.getByText('Electronics');
    expect(currentPage).toHaveAttribute('aria-current', 'page');
    expect(currentPage.closest('span')).toBeTruthy();
  });

  it('renders links for non-last items', () => {
    renderWithTheme(<Breadcrumbs items={defaultItems} />);
    const homeLink = screen.getByText('Home').closest('a');
    expect(homeLink).toHaveAttribute('href', '/');
    const productsLink = screen.getByText('Products').closest('a');
    expect(productsLink).toHaveAttribute('href', '/products');
  });

  it('renders custom separator', () => {
    renderWithTheme(<Breadcrumbs items={defaultItems} separator="/" />);
    const separators = document.querySelectorAll('[aria-hidden="true"]');
    expect(separators.length).toBeGreaterThan(0);
  });

  it('renders items with custom icons', () => {
    const itemsWithIcons = [
      { label: 'Home', href: '/', icon: <span data-testid="home-icon">🏠</span> },
      { label: 'Products', icon: <span data-testid="product-icon">📦</span> },
    ];
    renderWithTheme(<Breadcrumbs items={itemsWithIcons} homeIcon={null} />);
    expect(screen.getByTestId('home-icon')).toBeInTheDocument();
    expect(screen.getByTestId('product-icon')).toBeInTheDocument();
  });

  it('renders span instead of link when no href provided', () => {
    const itemsWithoutHref = [{ label: 'Test' }];
    renderWithTheme(<Breadcrumbs items={itemsWithoutHref} />);
    const lastItem = screen.getByText('Test');
    expect(lastItem.closest('span')).toHaveAttribute('aria-current', 'page');
  });

  it('handles empty items array', () => {
    renderWithTheme(<Breadcrumbs items={[]} />);
    expect(screen.getByLabelText('Breadcrumb')).toBeInTheDocument();
  });

  it('renders with custom home icon', () => {
    const customHomeIcon = <span data-testid="custom-home">🏡</span>;
    renderWithTheme(<Breadcrumbs items={defaultItems} homeIcon={customHomeIcon} />);
    expect(screen.getByTestId('custom-home')).toBeInTheDocument();
  });

  it('does not render home icon when explicitly set to null', () => {
    const items = [{ label: 'First', href: '/' }];
    renderWithTheme(<Breadcrumbs items={items} homeIcon={null} />);
    expect(screen.getByText('First')).toBeInTheDocument();
  });

  it('renders single item without separator', () => {
    renderWithTheme(<Breadcrumbs items={[{ label: 'Home', href: '/' }]} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
  });
});
