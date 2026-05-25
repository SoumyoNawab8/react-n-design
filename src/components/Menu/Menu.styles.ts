'use client';
import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';

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
    box-shadow: ${({ theme }) => (theme as any).shadows.softInset};
  }
`;

export const MenuDropdown = styled(motion.ul)`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  min-width: 180px;
  max-width: 280px;
  margin: 0;
  padding: 6px;
  list-style: none;
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  z-index: 800;
  overflow: hidden;
`;

export const MenuItem = styled.li.withConfig({
  shouldForwardProp: (prop) => !['disabled', 'active'].includes(prop),
})<{
  disabled?: boolean;
  active?: boolean;
}>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 14px;
  color: ${({ theme, disabled }) => (disabled ? '#aaa' : theme.colors.text)};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.15s ease;
  user-select: none;

  ${({ active, theme }) =>
    active &&
    css`
      background: ${(theme as any).colors.hoverBg};
      color: ${theme.colors.primary};
      font-weight: 600;
    `}

  &:hover:not([aria-disabled='true']) {
    background: ${({ theme }) => (theme as any).colors.hoverBg};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: -2px;
  }

  & > svg {
    flex-shrink: 0;
    font-size: 16px;
  }
`;

export const MenuDivider = styled.li`
  height: 1px;
  margin: 4px 0;
  background: ${({ theme }) => `${(theme as any).colors.shadowLight}40`};
  list-style: none;
`;

export const MenuLabel = styled.li`
  padding: 8px 12px 4px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${({ theme }) => (theme as any).colors.shadowLight};
  user-select: none;
`;
