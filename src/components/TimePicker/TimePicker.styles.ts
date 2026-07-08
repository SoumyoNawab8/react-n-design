'use client';
import styled, { css } from 'styled-components';
import { motion } from '../../utils/lazyMotion';
import { iconColor } from '../../styles/iconColor';

const sizes = {
  small: { height: '36px', fontSize: '14px', padding: '0 12px' },
  medium: { height: '48px', fontSize: '16px', padding: '0 16px' },
  large: { height: '56px', fontSize: '18px', padding: '0 20px' },
};

export const TimePickerWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => !['fullWidth', 'size'].includes(prop),
})<{
  fullWidth?: boolean;
  size?: 'small' | 'medium' | 'large';
}>`
  position: relative;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : '220px')};
  display: inline-flex;
  flex-direction: column;
  gap: 6px;

  & > label {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.text};
    font-weight: 500;
  }
`;

export const TimePickerInputGroup = styled.div.withConfig({
  shouldForwardProp: (prop) => !['open', 'disabled', 'error', 'size'].includes(prop),
})<{
  open?: boolean;
  disabled?: boolean;
  error?: boolean;
  size?: 'small' | 'medium' | 'large';
}>`
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.softInset};
  transition: box-shadow 0.2s ease-in-out;
  height: ${({ size }) => sizes[size || 'medium'].height};
  padding: ${({ size }) => sizes[size || 'medium'].padding};
  gap: 12px;
  cursor: pointer;
  box-sizing: border-box;

  ${({ error, theme }) =>
    error &&
    css`
      box-shadow: ${theme.shadows.softInset}, 0 0 0 2px #e53e3e90 !important;
    `}

  ${({ open, theme }) =>
    open &&
    css`
      box-shadow: ${theme.shadows.softInset}, 0 0 0 2px ${theme.colors.primary}40;
    `}

  &:focus-within {
    z-index: 2;
    box-shadow: ${({ theme, error }) =>
      `${theme.shadows.softInset}, 0 0 0 2px ${error ? '#e53e3e' : theme.colors.primary}40`};
  }

  &:hover:not(:disabled) {
    box-shadow: ${({ theme, error }) =>
      `${theme.shadows.softInset}, 0 0 0 2px ${error ? '#e53e3e' : theme.colors.primary}30`};
  }

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: not-allowed;
      opacity: 0.6;
    `}
`;

export const TimePickerInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
  cursor: inherit;
  height: 100%;
  width: 100%;
  box-sizing: border-box;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  &:disabled {
    cursor: not-allowed;
    color: ${({ theme }) => theme.colors.disabledText};
    opacity: 0.7;
  }
`;

export const TimePickerClockIcon = styled.span.withConfig({
  shouldForwardProp: (prop) => !['disabled'].includes(prop),
})<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ disabled, theme }) => (disabled ? theme.colors.disabledText : theme.colors.text)};
  font-size: 18px;
  flex-shrink: 0;
  opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};
  ${iconColor}
`;

export const TimePickerClearButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 14px;
  padding: 0;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  ${iconColor}

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
    border-radius: 4px;
  }
`;

export const TimePickerPanel = styled(motion.div)`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  width: 100%;
  min-width: 320px;
  max-width: 320px;
  z-index: 800;
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  padding: 16px;
  overflow: hidden;
  box-sizing: border-box;
`;

export const TimePickerDisplayText = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 12px;
  text-align: center;
  padding-bottom: 8px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.hoverBg};
`;

export const TimePickerColumns = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  max-height: 280px;
`;

export const TimePickerSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  min-width: 60px;
`;

export const TimePickerSectionLabel = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  opacity: 0.7;
`;

export const TimePickerColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-height: 240px;
  overflow-y: auto;
  padding: 4px;
  border-radius: ${({ theme }) => theme.borderRadius};
  background: ${({ theme }) => theme.colors.hoverBg}20;

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.shadowDark};
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.text};
  }
`;

export const TimePickerOption = styled.button.withConfig({
  shouldForwardProp: (prop) => !['isSelected', 'disabled'].includes(prop),
})<{
  isSelected?: boolean;
  disabled?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 8px 12px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: ${({ isSelected }) => (isSelected ? '600' : '400')};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  background: ${({ isSelected, theme }) => (isSelected ? theme.colors.primary : 'transparent')};
  color: ${({ isSelected, disabled, theme }) => {
    if (disabled) return theme.colors.disabledText;
    return isSelected ? '#ffffff' : theme.colors.text;
  }};
  transition: all 0.15s ease;
  min-height: 36px;
  box-sizing: border-box;

  ${({ isSelected, theme }) =>
    isSelected &&
    css`
      box-shadow: ${theme.shadows.soft};
    `}

  &:hover:not(:disabled):not([disabled]) {
    background: ${({ isSelected, theme }) => (isSelected ? undefined : theme.colors.hoverBg)};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: -2px;
  }

  &[disabled] {
    opacity: 0.4;
  }
`;

export const TimePickerAmPmButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !['isSelected'].includes(prop),
})<{
  isSelected?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 12px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  background: ${({ isSelected, theme }) => (isSelected ? theme.colors.primary : 'transparent')};
  color: ${({ isSelected, theme }) => (isSelected ? '#ffffff' : theme.colors.text)};
  transition: all 0.15s ease;
  box-shadow: ${({ isSelected, theme }) => (isSelected ? theme.shadows.soft : 'none')};

  &:hover {
    background: ${({ isSelected, theme }) => (isSelected ? undefined : theme.colors.hoverBg)};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: -2px;
  }
`;
