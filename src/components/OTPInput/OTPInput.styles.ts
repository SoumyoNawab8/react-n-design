'use client';
import styled, { css } from 'styled-components';

export const OTPInputContainer = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const OTPDigitInput = styled.input.withConfig({
  shouldForwardProp: (prop) => !['error'].includes(prop),
})<{ error?: boolean }>`
  width: 48px;
  height: 56px;
  text-align: center;
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.background};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.softInset};
  outline: none;
  transition: box-shadow 0.2s ease-in-out;
  caret-color: ${({ theme }) => theme.colors.primary};

  &:focus {
    box-shadow: ${({ theme }) => theme.shadows.softInset},
      0 0 0 2px ${({ theme }) => theme.colors.primary}40;
  }

  ${({ error, theme }) =>
    error &&
    css`
      box-shadow: ${theme.shadows.softInset}, 0 0 0 2px #e53e3e90 !important;
    `}

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  /* Hide number spinners */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  -moz-appearance: textfield;
`;
