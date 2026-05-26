'use client';
import styled, { css } from 'styled-components';

export const StepperWrapper = styled.div`
  display: flex;
  width: 100%;
`;

export const StepperItem = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isActive', 'isCompleted', 'isClickable'].includes(prop),
})<{ isActive?: boolean; isCompleted?: boolean; isClickable?: boolean }>`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding: 0 8px;
  cursor: ${({ isClickable }) => (isClickable ? 'pointer' : 'default')};

  &:not(:last-child)::after {
    content: '';
    position: absolute;
    top: 17px;
    left: calc(50% + 20px);
    right: calc(-50% + 20px);
    height: 2px;
    background: ${({ isCompleted, theme }) =>
      isCompleted ? theme.colors.primary : `${theme.colors.shadowDark}40`};
    z-index: 0;
  }
`;

export const StepperCircle = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isActive', 'isCompleted'].includes(prop),
})<{ isActive?: boolean; isCompleted?: boolean }>`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
  z-index: 1;
  transition: all 0.3s ease;
  flex-shrink: 0;

  ${({ isActive, isCompleted, theme }) => {
    if (isActive) {
      return css`
        background: ${theme.colors.primary};
        color: #fff;
        box-shadow: ${theme.shadows.soft};
      `;
    }
    if (isCompleted) {
      return css`
        background: ${theme.colors.primary};
        color: #fff;
      `;
    }
    return css`
      background: ${theme.colors.background};
      color: ${theme.colors.text};
      box-shadow: ${theme.shadows.softInset};
    `;
  }}
`;

export const StepperTitle = styled.span.withConfig({
  shouldForwardProp: (prop) => !['isActive'].includes(prop),
})<{ isActive?: boolean }>`
  margin-top: 8px;
  font-size: 13px;
  font-weight: ${({ isActive }) => (isActive ? '600' : '400')};
  color: ${({ isActive, theme }) => (isActive ? theme.colors.primary : theme.colors.text)};
  text-align: center;
  line-height: 1.3;
`;

export const StepperDescription = styled.span`
  margin-top: 4px;
  font-size: 11px;
  color: ${({ theme }) => theme.colors.shadowLight};
  text-align: center;
  max-width: 120px;
  line-height: 1.3;
`;

export const StepperContent = styled.div`
  width: 100%;
  padding: 16px 0;
`;

export const StepperActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 16px;
`;
