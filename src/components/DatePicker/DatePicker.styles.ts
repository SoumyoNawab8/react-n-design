'use client';
import styled, { css } from 'styled-components';
import { motion } from '../../utils/lazyMotion';

export const DatePickerWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => !['fullWidth'].includes(prop),
})<{ fullWidth?: boolean }>`
  position: relative;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : '280px')};
  display: inline-flex;
  flex-direction: column;
  gap: 8px;

  & > label {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.text};
    font-weight: 500;
  }
`;

export const DatePickerInputGroup = styled.div.withConfig({
  shouldForwardProp: (prop) => !['hasError', 'disabled', 'open'].includes(prop),
})<{
  hasError?: boolean;
  disabled?: boolean;
  open?: boolean;
}>`
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.softInset};
  transition: box-shadow 0.2s ease-in-out;
  height: 48px;
  padding: 0 16px;
  gap: 12px;
  cursor: pointer;
  box-sizing: border-box;

  ${({ hasError, theme }) =>
    hasError &&
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
    box-shadow: ${({ theme, hasError }) =>
      `${theme.shadows.softInset}, 0 0 0 2px ${
        hasError ? '#e53e3e' : theme.colors.primary
      }40`};
  }

  &:hover:not(:disabled) {
    box-shadow: ${({ theme, hasError }) =>
      `${theme.shadows.softInset}, 0 0 0 2px ${
        hasError ? '#e53e3e' : theme.colors.primary
      }30`};
  }
`;

export const DatePickerInput = styled.input`
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
    color: ${({ theme }) => theme.colors.shadowDark};
  }

  &:disabled {
    cursor: not-allowed;
    color: #aaa;
  }
`;

export const DatePickerCalendarIcon = styled.span.withConfig({
  shouldForwardProp: (prop) => !['disabled'].includes(prop),
})<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ disabled, theme }) => (disabled ? theme.colors.shadowDark : theme.colors.text)};
  font-size: 18px;
  flex-shrink: 0;
`;

export const DatePickerClearButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.shadowDark};
  font-size: 14px;
  padding: 0;
  width: 20px;
  height: 20px;
  flex-shrink: 0;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const DatePickerPanel = styled(motion.div)`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  width: 100%;
  min-width: 280px;
  z-index: 800;
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  padding: 16px;
  overflow: hidden;
  box-sizing: border-box;
`;

export const DatePickerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  gap: 8px;
`;

export const DatePickerHeaderButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.background};
  border: none;
  border-radius: 8px;
  width: 32px;
  height: 32px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.hoverBg};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }

  &:active:not(:disabled) {
    box-shadow: ${({ theme }) => theme.shadows.softInset};
  }
`;

export const DatePickerMonthYear = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  flex: 1;
  justify-content: center;
`;

export const DatePickerSelect = styled.select`
  background: ${({ theme }) => theme.colors.background};
  border: none;
  border-radius: 6px;
  padding: 4px 8px;
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.shadows.softInset};
  outline: none;

  &:focus {
    box-shadow: ${({ theme }) =>
      `${theme.shadows.softInset}, 0 0 0 2px ${theme.colors.primary}40`};
  }
`;

export const DatePickerWeekdays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  margin-bottom: 8px;
`;

export const DatePickerWeekday = styled.div`
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.6;
  padding: 4px 0;
`;

export const DatePickerGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
`;

export const DatePickerDay = styled.button.withConfig({
  shouldForwardProp: (prop) =>
    ![
      'isSelected',
      'isRangeStart',
      'isRangeEnd',
      'isInRange',
      'isToday',
      'isOtherMonth',
      'isDisabled',
    ].includes(prop),
})<{
  isSelected?: boolean;
  isRangeStart?: boolean;
  isRangeEnd?: boolean;
  isInRange?: boolean;
  isToday?: boolean;
  isOtherMonth?: boolean;
  isDisabled?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  aspect-ratio: 1;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  background: transparent;
  color: ${({ theme, isOtherMonth, isDisabled }) => {
    if (isDisabled) return theme.colors.shadowDark;
    if (isOtherMonth) return theme.colors.shadowDark;
    return theme.colors.text;
  }};
  position: relative;
  transition: all 0.15s ease;

  ${({ isToday, isSelected, theme }) =>
    isToday &&
    css`
      &::after {
        content: '';
        position: absolute;
        bottom: 4px;
        left: 50%;
        transform: translateX(-50%);
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: ${isSelected ? '#ffffff' : theme.colors.primary};
      }
    `}

  ${({ isRangeStart, isRangeEnd, theme }) =>
    isRangeStart &&
    isRangeEnd &&
    css`
      background: ${theme.colors.primary};
      color: #ffffff;
      border-radius: 8px;
      font-weight: 700;
    `}

  ${({ isSelected, theme }) =>
    isSelected &&
    css`
      background: ${theme.colors.primary};
      color: #ffffff;
      box-shadow: ${theme.shadows.soft};
      font-weight: 700;
    `}

  ${({ isInRange, isRangeStart, isRangeEnd, theme }) =>
    isInRange &&
    !isRangeStart &&
    !isRangeEnd &&
    css`
      background: ${theme.colors.primary}20;
      border-radius: 0;
    `}

  ${({ isRangeStart, theme, isRangeEnd }) =>
    isRangeStart &&
    !isRangeEnd &&
    css`
      background: ${theme.colors.primary};
      color: #ffffff;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      font-weight: 700;
    `}

  ${({ isRangeEnd, theme, isRangeStart }) =>
    isRangeEnd &&
    !isRangeStart &&
    css`
      background: ${theme.colors.primary};
      color: #ffffff;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      font-weight: 700;
    `}

  &:hover:not(:disabled) {
    background: ${({ theme, isSelected, isRangeStart, isRangeEnd }) =>
      isSelected || isRangeStart || isRangeEnd ? undefined : theme.colors.hoverBg};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: -2px;
  }
`;

export const DatePickerFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid ${({ theme }) => theme.colors.hoverBg};
`;

export const DatePickerTodayButton = styled.button`
  background: transparent;
  border: none;
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;

  &:hover {
    background: ${({ theme }) => theme.colors.hoverBg};
  }
`;

export const DatePickerRangeText = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.7;
`;
