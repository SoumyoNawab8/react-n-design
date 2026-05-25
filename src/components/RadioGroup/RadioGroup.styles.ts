import styled, { css } from 'styled-components';

export const RadioGroupContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !['orientation'].includes(prop),
})<{ orientation: 'horizontal' | 'vertical' }>`
  display: flex;
  flex-direction: ${({ orientation }) => (orientation === 'horizontal' ? 'row' : 'column')};
  gap: ${({ orientation }) => (orientation === 'horizontal' ? '20px' : '12px')};
  align-items: ${({ orientation }) => (orientation === 'horizontal' ? 'center' : 'flex-start')};
`;

export const RadioItem = styled.div.withConfig({
  shouldForwardProp: (prop) => !['disabled', 'selected'].includes(prop),
})<{ disabled: boolean; selected: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  outline: none;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
    border-radius: 4px;
  }
`;

export const RadioCircle = styled.div.withConfig({
  shouldForwardProp: (prop) => !['disabled', 'selected'].includes(prop),
})<{ selected: boolean; disabled: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.2s ease-in-out;

  box-shadow: ${({ selected, theme }) =>
    selected ? (theme as any).shadows.soft : (theme as any).shadows.softInset};

  background: ${({ selected, theme }) => (selected ? theme.colors.primary : theme.colors.background)};
  color: ${({ selected, theme }) => (selected ? theme.colors.white : theme.colors.primary)};

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.5;
    `}
`;

export const RadioInnerDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: currentColor;
`;

export const RadioLabel = styled.span.withConfig({
  shouldForwardProp: (prop) => !['disabled'].includes(prop),
})<{ disabled: boolean }>`
  color: ${({ disabled, theme }) => (disabled ? (theme as any).colors.shadowDark : theme.colors.text)};
  font-size: 16px;
  font-weight: 500;
  user-select: none;
`;
