import styled, { css } from 'styled-components';

export const CheckboxContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !['disabled'].includes(prop),
})<{ disabled: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;

export const CheckboxBox = styled.div.withConfig({
  shouldForwardProp: (prop) => !['disabled'].includes(prop),
})<{ disabled: boolean }>`
  width: 22px;
  height: 22px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.2s ease-in-out;
  box-shadow: ${({ theme }) => (theme as any).shadows.softInset};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.primary};

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.5;
      cursor: not-allowed;
    `}

  &[data-checked='true'] {
    box-shadow: ${({ theme }) => (theme as any).shadows.soft};
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

export const CheckIcon = styled.svg`
  width: 14px;
  height: 14px;
  fill: none;
  stroke: currentColor;
  stroke-width: 3;
  stroke-linecap: round;
  stroke-linejoin: round;
`;

export const IndeterminateIcon = styled.div`
  width: 10px;
  height: 3px;
  border-radius: 1.5px;
  background: currentColor;
`;

export const CheckboxLabel = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-size: 16px;
  font-weight: 500;
  user-select: none;
`;
