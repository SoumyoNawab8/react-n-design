'use client';
import styled, { css } from 'styled-components';
import { motion } from '../../utils/lazyMotion';
import { iconColor } from '../../styles/iconColor';

export const MultiSelectWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const MultiSelectInputGroup = styled.div.withConfig({
  shouldForwardProp: (prop) => !['disabled', 'isOpen'].includes(prop),
})<{
  disabled: boolean;
  isOpen: boolean;
}>`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
  width: 100%;
  min-height: 48px;
  padding: 8px 12px;
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.softInset};
  transition: box-shadow 0.2s ease-in-out;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'text')};
  box-sizing: border-box;

  &:focus-within {
    z-index: 2;
    box-shadow: ${({ theme }) => `${theme.shadows.softInset}, 0 0 0 2px ${theme.colors.primary}40`};
  }

  ${({ disabled, theme }) =>
    disabled &&
    css`
      opacity: 0.6;
      box-shadow: ${theme.shadows.softInset};
    `}
`;

export const MultiSelectTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  flex-grow: 1;
`;

export const MultiSelectTag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  background: ${({ theme }) => theme.colors.primary}15;
  color: ${({ theme }) => theme.colors.primary};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  user-select: none;

  & button {
    background: transparent;
    border: none;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: inherit;
    font-size: 12px;
    padding: 0;
    margin-left: 2px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    transition: background 0.15s ease;
    ${iconColor}

    &:hover {
      background: ${({ theme }) => theme.colors.primary}25;
    }

    &:focus-visible {
      outline: 2px solid ${({ theme }) => theme.colors.primary};
      outline-offset: 1px;
    }
  }
`;

export const MultiSelectInput = styled.input`
  flex: 1;
  min-width: 80px;
  border: none;
  outline: none;
  background: transparent;
  font-size: 15px;
  color: ${({ theme }) => theme.colors.text};
  padding: 4px 0;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  &:disabled {
    cursor: not-allowed;
    color: ${({ theme }) => theme.colors.disabledText};
    opacity: 0.7;
  }
`;

export const MultiSelectDropdown = styled(motion.div).withConfig({
  shouldForwardProp: (prop) => !['maxHeight'].includes(prop),
})<{ maxHeight?: number }>`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  width: 100%;
  max-height: ${({ maxHeight }) => (maxHeight ? `${maxHeight}px` : '250px')};
  overflow-y: auto;
  z-index: 800;
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  padding: 8px;
`;

export const MultiSelectOption = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isHighlighted', 'isSelected'].includes(prop),
})<{ isHighlighted: boolean; isSelected: boolean }>`
  padding: 10px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;

  ${({ isSelected, theme }) =>
    isSelected &&
    css`
      font-weight: 600;
      color: ${theme.colors.primary};
    `}

  ${({ isHighlighted, theme }) =>
    isHighlighted &&
    css`
      background: ${theme.colors.hoverBg};
    `}

  &:hover {
    background: ${({ theme }) => theme.colors.hoverBg};
  }
`;

export const MultiSelectEmpty = styled.div`
  padding: 12px;
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 14px;
`;

export const MultiSelectCheck = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.primary};
  ${iconColor}
`;
