import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import type React from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../../styles/theme';
import { Avatar, AvatarGroup } from './Avatar';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

describe('Avatar', () => {
  it('renders with image when src is provided', () => {
    renderWithTheme(<Avatar src="test.jpg" alt="Test avatar" />);
    expect(screen.getByAltText('Test avatar')).toHaveAttribute('src', 'test.jpg');
  });

  it('renders initials when no src is provided', () => {
    renderWithTheme(<Avatar initials="JD" />);
    const avatar = screen.getByText('JD');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('aria-hidden', 'true');
  });

  it('renders icon when no src or initials provided', () => {
    renderWithTheme(<Avatar />);
    const avatar = screen.getByRole('img', { name: /avatar/i });
    expect(avatar).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = renderWithTheme(<Avatar src="test.jpg" alt="Test" />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});

describe('AvatarGroup', () => {
  it('renders multiple avatars in a group', () => {
    renderWithTheme(
      <AvatarGroup>
        <Avatar initials="A" />
        <Avatar initials="B" />
        <Avatar initials="C" />
      </AvatarGroup>
    );

    expect(screen.getByRole('group', { name: /avatar group/i })).toBeInTheDocument();
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
    expect(screen.getByText('C')).toBeInTheDocument();
  });

  it('shows overflow count when max is set', () => {
    renderWithTheme(
      <AvatarGroup max={2}>
        <Avatar initials="A" />
        <Avatar initials="B" />
        <Avatar initials="C" />
      </AvatarGroup>
    );

    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
    expect(screen.getByText(/\+1/i)).toBeInTheDocument();
    expect(screen.queryByText('C')).not.toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = renderWithTheme(
      <AvatarGroup>
        <Avatar initials="A" />
        <Avatar initials="B" />
      </AvatarGroup>
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
