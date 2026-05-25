import { fireEvent, render, screen } from '@testing-library/react';
import axe from 'axe-core';
import type React from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../../styles/theme';
import { ScrollArea } from './ScrollArea';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

const setScrollDimensions = (
  element: HTMLElement,
  scrollHeight: number,
  clientHeight: number,
  scrollWidth: number = 0,
  clientWidth: number = 0
) => {
  Object.defineProperty(element, 'scrollHeight', {
    configurable: true,
    value: scrollHeight,
  });
  Object.defineProperty(element, 'clientHeight', {
    configurable: true,
    value: clientHeight,
  });
  Object.defineProperty(element, 'scrollWidth', {
    configurable: true,
    value: scrollWidth,
  });
  Object.defineProperty(element, 'clientWidth', {
    configurable: true,
    value: clientWidth,
  });
};

describe('ScrollArea', () => {
  it('renders children inside a scrollable container', () => {
    renderWithTheme(
      <ScrollArea>
        <div>Item 1</div>
        <div>Item 2</div>
      </ScrollArea>
    );
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByRole('region', { name: /scrollable content/i })).toBeInTheDocument();
  });

  it('has custom scrollbar tracks', () => {
    const { container } = renderWithTheme(
      <ScrollArea>
        <div style={{ height: '2000px' }}>Long content</div>
      </ScrollArea>
    );
    const viewport = screen.getByRole('region', { name: /scrollable content/i });
    setScrollDimensions(viewport, 2000, 200, 0, 0);
    fireEvent.scroll(viewport);

    const verticalTrack = container.querySelector('[data-scrollbar="vertical"]');
    expect(verticalTrack).toBeInTheDocument();
  });

  it('vertical scrolling updates thumb position', () => {
    const { container } = renderWithTheme(
      <ScrollArea>
        <div style={{ height: '2000px' }}>Long content</div>
      </ScrollArea>
    );
    const viewport = screen.getByRole('region', { name: /scrollable content/i });
    setScrollDimensions(viewport, 2000, 200, 0, 0);

    // Initial render to set thumb
    fireEvent.scroll(viewport);

    const thumb = container.querySelector('[data-thumb="vertical"]') as HTMLElement;
    expect(thumb).toBeInTheDocument();

    viewport.scrollTop = 500;
    fireEvent.scroll(viewport);

    expect(thumb.style.transform).toContain('translateY');
  });

  it('renders horizontal scrollbar when horizontal is true', () => {
    const { container } = renderWithTheme(
      <ScrollArea horizontal>
        <div style={{ width: '2000px' }}>Wide content</div>
      </ScrollArea>
    );
    const viewport = screen.getByRole('region', { name: /scrollable content/i });
    setScrollDimensions(viewport, 200, 200, 2000, 200);
    fireEvent.scroll(viewport);

    const horizontalTrack = container.querySelector('[data-scrollbar="horizontal"]');
    expect(horizontalTrack).toBeInTheDocument();
  });

  it('auto-hides scrollbar when not hovering or scrolling', () => {
    const { container } = renderWithTheme(
      <ScrollArea autoHide>
        <div style={{ height: '2000px' }}>Long content</div>
      </ScrollArea>
    );
    const wrapper = container.querySelector('[data-testid="scroll-area"]') as HTMLElement;
    const viewport = screen.getByRole('region', { name: /scrollable content/i });
    setScrollDimensions(viewport, 2000, 200, 0, 0);
    fireEvent.scroll(viewport);

    const track = container.querySelector('[data-scrollbar="vertical"]') as HTMLElement;
    expect(track).toBeInTheDocument();

    // By default with autoHide (not hovering), track should be hidden
    expect(track).toHaveStyle('opacity: 0');

    // On mouse enter, opacity should increase
    fireEvent.mouseEnter(wrapper);
    expect(track).toHaveStyle('opacity: 1');

    // On mouse leave, opacity should reduce
    fireEvent.mouseLeave(wrapper);
    expect(track).toHaveStyle('opacity: 0');
  });

  it('is accessible', async () => {
    const { container } = renderWithTheme(
      <ScrollArea>
        <div>Content</div>
      </ScrollArea>
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
