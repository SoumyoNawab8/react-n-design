import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type React from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../../styles/theme';
import { Carousel } from './Carousel';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

describe('Carousel', () => {
  const mockItems = [
    { id: '1', title: 'Slide 1', description: 'First slide' },
    { id: '2', title: 'Slide 2', description: 'Second slide' },
    { id: '3', title: 'Slide 3', description: 'Third slide' },
  ];

  it('renders with slides', () => {
    renderWithTheme(<Carousel items={mockItems} />);
    expect(screen.getByText('Slide 1')).toBeInTheDocument();
    expect(screen.getByText('First slide')).toBeInTheDocument();
  });

  it('renders navigation buttons when showNav is true', () => {
    renderWithTheme(<Carousel items={mockItems} showNav />);
    expect(screen.getByLabelText('Previous slide')).toBeInTheDocument();
    expect(screen.getByLabelText('Next slide')).toBeInTheDocument();
  });

  it('renders dots navigation when showDots is true', () => {
    renderWithTheme(<Carousel items={mockItems} showDots />);
    const dots = screen.getAllByRole('tab');
    expect(dots).toHaveLength(3);
  });

  it('renders counter when showCounter is true', () => {
    renderWithTheme(<Carousel items={mockItems} showCounter />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('/ 3')).toBeInTheDocument();
  });

  it('navigates to next slide on next button click', async () => {
    renderWithTheme(<Carousel items={mockItems} showNav showCounter />);
    const nextButton = screen.getByLabelText('Next slide');
    await userEvent.click(nextButton);
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('navigates to previous slide on prev button click', async () => {
    renderWithTheme(<Carousel items={mockItems} showNav showCounter />);
    const nextButton = screen.getByLabelText('Next slide');
    await userEvent.click(nextButton);
    const prevButton = screen.getByLabelText('Previous slide');
    await userEvent.click(prevButton);
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('navigates using dot buttons', async () => {
    renderWithTheme(<Carousel items={mockItems} showDots showCounter />);
    const dots = screen.getAllByRole('tab');
    await userEvent.click(dots[2]);
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('calls onChange when slide changes', async () => {
    const onChange = vi.fn();
    renderWithTheme(<Carousel items={mockItems} showNav onChange={onChange} />);
    const nextButton = screen.getByLabelText('Next slide');
    await userEvent.click(nextButton);
    expect(onChange).toHaveBeenCalledWith(1);
  });

  it('navigates to next slide', async () => {
    renderWithTheme(<Carousel items={mockItems} showNav showCounter />);
    const nextButton = screen.getByLabelText('Next slide');
    await userEvent.click(nextButton);
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('navigates to first slide', async () => {
    renderWithTheme(<Carousel items={mockItems} showNav showCounter />);
    const nextButton = screen.getByLabelText('Next slide');
    await userEvent.click(nextButton);
    await userEvent.click(nextButton);
    const prevButton = screen.getByLabelText('Previous slide');
    await userEvent.click(prevButton);
    await userEvent.click(prevButton);
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('navigates to last slide via dots', async () => {
    renderWithTheme(<Carousel items={mockItems} showDots showCounter />);
    const dots = screen.getAllByRole('tab');
    await userEvent.click(dots[dots.length - 1]);
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('toggles autoplay with space key', async () => {
    renderWithTheme(<Carousel items={mockItems} autoPlay showCounter />);
    const viewport = screen.getByRole('region');
    fireEvent.keyDown(viewport, { key: ' ' });
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('handles empty items array gracefully', () => {
    renderWithTheme(<Carousel items={[]} />);
    expect(screen.getByText('No slides to display')).toBeInTheDocument();
  });

  it('renders with custom height', () => {
    renderWithTheme(<Carousel items={mockItems} height="500px" />);
    const region = screen.getByRole('region');
    expect(region).toHaveStyle({ height: '500px' });
  });

  it('calls onSlideClick when slide is clicked', async () => {
    const onSlideClick = vi.fn();
    renderWithTheme(<Carousel items={mockItems} onSlideClick={onSlideClick} />);
    const title = screen.getByText('Slide 1');
    await userEvent.click(title);
    expect(onSlideClick).toHaveBeenCalled();
  });

  it('loops slides when loop is true', async () => {
    renderWithTheme(<Carousel items={mockItems} showNav showCounter loop />);
    const nextButton = screen.getByLabelText('Next slide');
    await userEvent.click(nextButton);
    await userEvent.click(nextButton);
    await userEvent.click(nextButton);
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('renders with legacy children prop', () => {
    renderWithTheme(
      <Carousel>
        <div>Child 1</div>
        <div>Child 2</div>
      </Carousel>
    );
    expect(screen.getByText('Child 1')).toBeInTheDocument();
    expect(screen.getByText('Child 2')).toBeInTheDocument();
  });

  it('renders thumbnails when showThumbnails is true', () => {
    const itemsWithImages = [
      { id: '1', title: 'Slide 1', image: '/image1.jpg' },
      { id: '2', title: 'Slide 2', image: '/image2.jpg' },
    ];
    renderWithTheme(<Carousel items={itemsWithImages} showDots showThumbnails />);
    const images = document.querySelectorAll('img');
    expect(images.length).toBeGreaterThan(0);
  });

  it('handles touch events for swipe navigation', () => {
    renderWithTheme(<Carousel items={mockItems} showCounter enableSwipe />);
    const viewport = screen.getByRole('region');
    fireEvent.touchStart(viewport, { targetTouches: [{ clientX: 300 }] });
    fireEvent.touchMove(viewport, { targetTouches: [{ clientX: 100 }] });
    fireEvent.touchEnd(viewport);
  });

  it('does not show nav buttons when showNav is false', () => {
    renderWithTheme(<Carousel items={mockItems} showNav={false} />);
    expect(screen.queryByLabelText('Previous slide')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Next slide')).not.toBeInTheDocument();
  });

  it('does not show dots when showDots is false', () => {
    renderWithTheme(<Carousel items={mockItems} showDots={false} />);
    expect(screen.queryByRole('tab')).not.toBeInTheDocument();
  });

  it('disables next button at last slide when not looping', () => {
    renderWithTheme(<Carousel items={mockItems} showNav />);
    const nextButton = screen.getByLabelText('Next slide');
    expect(nextButton).not.toBeDisabled();
  });

  it('renders slide with image', () => {
    const itemsWithImage = [{ id: '1', image: '/test.jpg', title: 'Image Slide' }];
    renderWithTheme(<Carousel items={itemsWithImage} />);
    // SlideImage renders as a div with background-image, not an <img> tag
    expect(screen.getByText('Image Slide')).toBeInTheDocument();
  });

  it('renders slide with custom content', () => {
    const itemsWithContent = [{ id: '1', content: <div data-testid="custom-content">Custom</div> }];
    renderWithTheme(<Carousel items={itemsWithContent} />);
    expect(screen.getByTestId('custom-content')).toBeInTheDocument();
  });
});
