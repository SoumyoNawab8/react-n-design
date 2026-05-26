'use client';
import styled, { css } from 'styled-components';
import { motion } from '../../utils/lazyMotion';

export const MenuWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

export const MenuTrigger = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: ${({ theme }) => `${theme.shadows.soft}, 0 0 0 2px ${theme.colors.primary}30`};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  &[aria-expanded='true'] {
    box-shadow: ${({ theme }) => theme.shadows.softInset};
  }
`;

export const MenuDropdown = styled(motion.ul)<{
  $isMobile?: boolean;
  $mobileFullscreen?: boolean;
}>`
  position: ${({ $isMobile }) => ($isMobile ? 'fixed' : 'absolute')};
  ${({ $isMobile, $mobileFullscreen }) =>
    $isMobile
      ? css`
          bottom: 0;
          left: 0;
          right: 0;
          top: ${$mobileFullscreen ? '0' : 'auto'};
          max-height: ${$mobileFullscreen ? '100vh' : '70vh'};
          width: 100%;
          border-radius: ${$mobileFullscreen ? '0' : '16px 16px 0 0'};
          padding: 16px 8px;
          overflow-y: auto;
          z-index: 1000;
          box-shadow: ${({ theme }) => theme.shadows.strong};
        `
      : css`
          top: calc(100% + 4px);
          left: 0;
          min-width: 180px;
          max-width: 280px;
          padding: 6px;
          border-radius: ${({ theme }) => theme.borderRadius};
          z-index: 800;
          overflow: hidden;
        `}
  margin: 0;
  list-style: none;
  background: ${({ theme }) => theme.colors.background};
  box-shadow: ${({ theme }) => theme.shadows.soft};
`;

export const MenuDrawerOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

export const MenuItem = styled.li.withConfig({
  shouldForwardProp: (prop) => !['disabled', '$active', '$danger'].includes(prop),
})<{
  disabled?: boolean;
  $active?: boolean;
  $danger?: boolean;
}>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  min-height: 44px;
  color: ${({ theme, disabled, $danger }) =>
    disabled ? '#aaa' : $danger ? theme.colors.danger : theme.colors.text};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  user-select: none;
  position: relative;

  ${({ $active, theme, $danger }) =>
    $active &&
    css`
      background: ${$danger ? `${theme.colors.danger}15` : theme.colors.hoverBg};
      color: ${$danger ? theme.colors.danger : theme.colors.primary};
      font-weight: 600;
    `}

  &:hover:not([aria-disabled='true']) {
    background: ${({ theme, $danger }) =>
      $danger ? `${theme.colors.danger}10` : theme.colors.hoverBg};
    transform: translateX(${({ theme }) => (theme.mode === 'dark' ? '2px' : '0')});
  }

  &:active:not([aria-disabled='true']) {
    transform: scale(0.98);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: -2px;
  }
`;

export const MenuItemIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  font-size: 16px;
  color: inherit;
  opacity: 0.8;
  transition: transform 0.2s ease, opacity 0.2s ease;

  ${MenuItem}:hover & {
    opacity: 1;
    transform: scale(1.1);
  }

  & > svg {
    width: 100%;
    height: 100%;
  }
`;

export const MenuItemLabel = styled.span`
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const MenuItemBadge = styled.span<{ $color?: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  background: ${({ $color, theme }) => $color || theme.colors.primary};
  color: white;
  min-width: 20px;
  height: 20px;
  flex-shrink: 0;
  transition: transform 0.2s ease;

  ${MenuItem}:hover & {
    transform: scale(1.05);
  }
`;

export const MenuItemCheckbox = styled.span<{ $checked?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border: 2px solid ${({ theme, $checked }) =>
    $checked ? theme.colors.primary : theme.colors.border};
  border-radius: 4px;
  background: ${({ theme, $checked }) =>
    $checked ? theme.colors.primary : 'transparent'};
  color: white;
  flex-shrink: 0;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  ${MenuItem}:hover & {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const MenuItemRadio = styled.span<{ $checked?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border: 2px solid ${({ theme, $checked }) =>
    $checked ? theme.colors.primary : theme.colors.border};
  border-radius: 50%;
  background: transparent;
  color: ${({ theme }) => theme.colors.primary};
  flex-shrink: 0;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  ${MenuItem}:hover & {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const MenuDivider = styled.li`
  height: 1px;
  margin: 8px 12px;
  background: ${({ theme }) => `${theme.colors.border}60`};
  list-style: none;
  position: relative;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: -4px;
    height: 8px;
    width: 1px;
    background: ${({ theme }) => `${theme.colors.border}40`};
  }

  &::before {
    left: 0;
  }

  &::after {
    right: 0;
  }
`;

export const MenuLabel = styled.li`
  padding: 12px 16px 8px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.colors.shadowLight};
  user-select: none;
  min-height: 36px;
  display: flex;
  align-items: center;
`;

// Mobile-specific dropdown variant
export const MenuDropdownMobile = styled(MenuDropdown)`
  margin: 0;
  border-radius: 16px 16px 0 0;
`;

export const MenuItemContent = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
`;
