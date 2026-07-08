'use client';
import styled, { css } from 'styled-components';

export const CalendarWrapper = styled.div`
  width: 100%;
  max-width: 320px;
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  padding: 16px;
  box-sizing: border-box;
`;

export const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  gap: 8px;
`;

export const CalendarHeaderButton = styled.button`
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

  &:hover {
    background: ${({ theme }) => theme.colors.hoverBg};
  }

  &:active {
    box-shadow: ${({ theme }) => theme.shadows.softInset};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

export const CalendarMonthYear = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  flex: 1;
`;

export const CalendarWeekdays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  margin-bottom: 8px;
`;

export const CalendarWeekday = styled.div`
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.6;
  padding: 4px 0;
`;

export const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
`;

export const CalendarDay = styled.button.withConfig({
  shouldForwardProp: (prop) =>
    !['isSelected', 'isToday', 'isOtherMonth', 'isDisabled'].includes(prop),
})<{
  isSelected?: boolean;
  isToday?: boolean;
  isOtherMonth?: boolean;
  isDisabled?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  aspect-ratio: 1;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  background: transparent;
  color: ${({ theme, isOtherMonth, isDisabled }) => {
    if (isDisabled) return theme.colors.disabledText;
    if (isOtherMonth) return theme.colors.textSecondary;
    return theme.colors.text;
  }};
  position: relative;
  transition: all 0.15s ease;
  padding: 0;

  ${({ isToday, isSelected, theme }) =>
    isToday &&
    !isSelected &&
    css`
      box-shadow: inset 0 0 0 1.5px ${theme.colors.primary};
    `}

  ${({ isSelected, theme }) =>
    isSelected &&
    css`
      background: ${theme.colors.primary};
      color: ${theme.colors.background};
      box-shadow: ${theme.shadows.soft};
      font-weight: 700;
    `}

  &:hover:not(:disabled) {
    background: ${({ theme, isSelected }) => (isSelected ? undefined : theme.colors.hoverBg)};
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

export const CalendarEventDot = styled.div`
  display: flex;
  gap: 2px;
  margin-top: 2px;

  & > span {
    width: 4px;
    height: 4px;
    border-radius: 50%;
  }
`;
