import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Rating } from './Rating';
import { ThemeContextProvider } from '../../context/ThemeContext';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeContextProvider defaultTheme="light">
      {component}
    </ThemeContextProvider>
  );
};

describe('Rating', () => {
  it('renders with default props', () => {
    renderWithTheme(<Rating value={3} />);
    expect(screen.getByLabelText('Rating: 3 out of 5')).toBeInTheDocument();
  });

  it('renders correct number of stars', () => {
    renderWithTheme(<Rating value={3} max={5} />);
    const rating = screen.getByRole('img');
    expect(rating.children).toHaveLength(5);
  });

  it('calls onChange when clicked in non-readonly mode', () => {
    const onChange = vi.fn();
    renderWithTheme(
      <Rating value={0} onChange={onChange} readOnly={false} />
    );
    
    // Click on the 3rd star
    const stars = screen.getByRole('img').children;
    fireEvent.click(stars[2]);
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it('does not call onChange in readOnly mode', () => {
    const onChange = vi.fn();
    renderWithTheme(
      <Rating value={3} onChange={onChange} readOnly={true} />
    );
    
    const stars = screen.getByRole('img').children;
    fireEvent.click(stars[2]);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('accepts keyboard interaction in non-readonly mode', () => {
    const onChange = vi.fn();
    renderWithTheme(
      <Rating value={0} onChange={onChange} readOnly={false} />
    );
    
    const stars = screen.getByRole('img').children;
    fireEvent.keyDown(stars[1], { key: 'Enter' });
    expect(onChange).toHaveBeenCalled();
  });

  it('clamps value to max', () => {
    renderWithTheme(<Rating value={10} max={5} />);
    expect(screen.getByLabelText('Rating: 5 out of 5')).toBeInTheDocument();
  });

  it('clamps negative values to 0', () => {
    renderWithTheme(<Rating value={-2} max={5} />);
    expect(screen.getByLabelText('Rating: 0 out of 5')).toBeInTheDocument();
  });

  it('has proper accessibility - img role', () => {
    renderWithTheme(<Rating value={3} />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('provides accessible aria-label for rating description', () => {
    renderWithTheme(<Rating value={2} max={5} />);
    expect(screen.getByLabelText('Rating: 2 out of 5')).toBeInTheDocument();
  });

  it('each star has accessible aria-label for rating value', () => {
    renderWithTheme(<Rating value={0} />);
    
    const stars = screen.getByRole('img').children;
    expect(stars[0]).toHaveAttribute('aria-label', 'Rate 1 out of 5');
    expect(stars[4]).toHaveAttribute('aria-label', 'Rate 5 out of 5');
  });

  it('stars have button role for interactivity', () => {
    renderWithTheme(<Rating value={0} />);
    
    const stars = screen.getByRole('img').children;
    expect(stars[0]).toHaveAttribute('role', 'button');
  });

  it('readOnly stars are not focusable', () => {
    renderWithTheme(<Rating value={3} readOnly />);
    
    const stars = screen.getByRole('img').children;
    expect(stars[0]).toHaveAttribute('tabindex', '-1');
  });

  it('interactive stars are focusable', () => {
    renderWithTheme(<Rating value={3} readOnly={false} />);
    
    const stars = screen.getByRole('img').children;
    expect(stars[0]).toHaveAttribute('tabindex', '0');
  });
});
