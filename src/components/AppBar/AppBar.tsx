'use client';
import type React from 'react';
import {
  AppBarActions,
  AppBarContainer,
  AppBarTitle,
  MenuButton,
  StyledAppBar,
} from './AppBar.styles';
import { FaBars } from '../../icons';

export interface AppBarProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /**
   * The title text to display in the app bar.
   */
  title?: React.ReactNode;
  /**
   * Content to display on the right side of the app bar (actions).
   */
  actions?: React.ReactNode;
  /**
   * Callback fired when the menu button is clicked.
   * If provided, a hamburger menu button will be shown.
   */
  onMenuClick?: () => void;
  /**
   * Whether to show a bottom border/shadow.
   * @default true
   */
  elevated?: boolean;
  /**
   * Position of the app bar.
   * @default 'static'
   */
  position?: 'static' | 'sticky' | 'fixed';
}

/**
 * A responsive top navigation bar with optional hamburger menu and actions.
 * Perfect for application headers and navigation.
 */
export const AppBar = ({
  title,
  actions,
  onMenuClick,
  elevated = true,
  position = 'static',
  ...props
}: AppBarProps) => {
  return (
    <StyledAppBar
      elevated={elevated}
      position={position}
      role="banner"
      {...props}
    >
      <AppBarContainer>
        {onMenuClick && (
          <MenuButton
            onClick={onMenuClick}
            aria-label="Open navigation menu"
            type="button"
          >
            <FaBars />
          </MenuButton>
        )}
        {title && <AppBarTitle>{title}</AppBarTitle>}
        {actions && <AppBarActions>{actions}</AppBarActions>}
      </AppBarContainer>
    </StyledAppBar>
  );
};