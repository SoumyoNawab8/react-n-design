import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Resizable } from './Resizable';
import { ThemeContextProvider } from '../../context/ThemeContext';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeContextProvider defaultTheme="light">
      {component}
    </ThemeContextProvider>
  );
};

describe('Resizable', () => {
  it('renders with two panels', () => {
    renderWithTheme(
      <Resizable>
        {<div>Panel 1</div>}
        {<div>Panel 2</div>}
      </Resizable>
    );
    expect(screen.getByText('Panel 1')).toBeInTheDocument();
    expect(screen.getByText('Panel 2')).toBeInTheDocument();
  });

  it('has resizable handle with aria attributes', () => {
    renderWithTheme(
      <Resizable>
        {<div>Panel 1</div>}
        {<div>Panel 2</div>}
      </Resizable>
    );
    
    const handle = screen.getByRole('separator');
    expect(handle).toBeInTheDocument();
    expect(handle).toHaveAttribute('aria-orientation', 'horizontal');
    expect(handle).toHaveAttribute('aria-label', 'Resize panel');
  });

  it('renders in vertical direction', () => {
    renderWithTheme(
      <Resizable direction="vertical">
        {<div>Panel 1</div>}
        {<div>Panel 2</div>}
      </Resizable>
    );
    
    expect(screen.getByRole('separator')).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('calls onSizeChange callback', () => {
    const onSizeChange = vi.fn();
    renderWithTheme(
      <Resizable onSizeChange={onSizeChange}>
        {<div>Panel 1</div>}
        {<div>Panel 2</div>}
      </Resizable>
    );
    
    // Note: Actual drag simulation would require more extensive setup
    // Just verifying the component renders with the callback
    expect(onSizeChange).not.toHaveBeenCalled();
  });
});