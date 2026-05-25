'use client';
import styled, { css } from 'styled-components';
import { motion } from '../../utils/lazyMotion';

export const TreeWrapper = styled.ul`
  list-style: none;
  margin: 0;
  padding: 8px;
  border-radius: ${({ theme }) => theme.borderRadius};
  background: ${({ theme }) => theme.colors.background};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  overflow: auto;
`;

export const TreeNodeItem = styled.li`
  list-style: none;
`;

export const TreeNodeContent = styled.div.withConfig({
  shouldForwardProp: (prop) => !['level', 'isSelected', 'disabled'].includes(prop),
})<{
  level: number;
  isSelected: boolean;
  disabled?: boolean;
}>`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  padding-left: ${({ level }) => 12 + level * 20}px;
  border-radius: 8px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  color: ${({ disabled, isSelected, theme }) =>
    disabled ? '#aaa' : isSelected ? theme.colors.primary : theme.colors.text};
  font-weight: ${({ isSelected }) => (isSelected ? 600 : 400)};
  transition: all 0.15s ease;
  user-select: none;
  outline: none;

  ${({ isSelected, theme }) =>
    isSelected &&
    css`
      background: ${(theme as any).colors.hoverBg};
      box-shadow: inset 3px 3px 6px ${(theme as any).colors.shadowDark},
        inset -3px -3px 6px ${(theme as any).colors.shadowLight};
    `}

  &:hover:not([disabled]) {
    background: ${({ theme }) => (theme as any).colors.hoverBg};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: -2px;
  }
`;

export const TreeNodeToggle = styled.button.withConfig({
  shouldForwardProp: (prop) => !['isExpanded'].includes(prop),
})<{
  isExpanded: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border: none;
  background: transparent;
  color: inherit;
  cursor: pointer;
  padding: 0;
  transition: transform 0.2s ease;
  transform: ${({ isExpanded }) => (isExpanded ? 'rotate(90deg)' : 'rotate(0deg)')};

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
    border-radius: 4px;
  }
`;

export const TreeNodeChildren = styled(motion.ul)`
  list-style: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
`;
