'use client';
import { motion } from '../../utils/lazyMotion';
import styled, { css, keyframes } from 'styled-components';

const sizes = {
  small: { height: '36px', fontSize: '14px', padding: '6px 12px' },
  medium: { height: '48px', fontSize: '16px', padding: '8px 16px' },
  large: { height: '56px', fontSize: '18px', padding: '10px 20px' },
};

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

export const ComboBoxSpinner = styled.div`
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-top-color: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  width: 1em;
  height: 1em;
  animation: ${spin} 0.8s linear infinite;
`;

export const ComboBoxWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => !['fullWidth'].includes(prop),
})<{ fullWidth: boolean }>`
  position: relative;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  & > label {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.text};
    font-weight: 500;
  }

  & .combobox-error {
    font-size: 12px;
    color: #e53e3e;
    margin: 0;
  }
`;

export const ComboBoxTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  flex-grow: 1;
`;

export const ComboBoxTag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.primary};
  box-shadow: ${({ theme }) => theme.shadows.soft};

  & button {
    background: transparent;
    border: none;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    color: inherit;
    font-size: 10px;
    padding: 0;
    margin-left: 2px;

    &:hover {
      color: #e53e3e;
    }
  }
`;

export const ComboBoxInputGroup = styled.div.withConfig({
  shouldForwardProp: (prop) => !['size', 'hasError', 'disabled', 'isMulti'].includes(prop),
})<{
  size: 'small' | 'medium' | 'large';
  hasError: boolean;
  disabled: boolean;
  isMulti: boolean;
}>`
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => (theme as any).shadows.softInset};
  transition: box-shadow 0.2s ease-in-out;
  min-height: ${({ size }) => sizes[size].height};
  height: auto;
  padding: ${({ size }) => sizes[size].padding};
  font-size: ${({ size }) => sizes[size].fontSize};
  gap: 8px;
  box-sizing: border-box;

  ${({ isMulti }) =>
    isMulti &&
    css`
      align-items: flex-start;
      padding-top: 8px;
      padding-bottom: 8px;
    `}

  ${({ hasError, theme }) =>
    hasError &&
    css`
      box-shadow: ${(theme as any).shadows.softInset}, 0 0 0 2px #e53e3e90 !important;
    `}

  &:focus-within {
    z-index: 2;
    box-shadow: ${({ theme, hasError }) =>
      `${(theme as any).shadows.softInset}, 0 0 0 2px ${
        hasError ? '#e53e3e' : theme.colors.primary
      }40`};
  }

  & .combobox-icons {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
    margin-left: auto;
  }
`;

export const ComboBoxInput = styled.input`
  flex: 1;
  min-width: 60px;
  border: none;
  outline: none;
  background: transparent;
  font-size: inherit;
  color: ${({ theme }) => theme.colors.text};
  padding: 0;
  height: 100%;

  &::placeholder {
    color: #a0a5b0;
  }

  &:disabled {
    cursor: not-allowed;
    background: transparent;
  }
`;

export const ComboBoxClearButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => (theme as any).colors.shadowDark};
  font-size: 14px;
  padding: 0;
  width: 20px;
  height: 20px;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const ComboBoxChevron = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isOpen'].includes(prop),
})<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  transition: transform 0.2s;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  color: ${({ theme }) => theme.colors.text};
`;

export const ComboBoxDropdown = styled(motion.div)`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  width: 100%;
  max-height: 250px;
  overflow-y: auto;
  z-index: 800;
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  padding: 8px;
`;

export const ComboBoxOption = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isActive', 'disabled'].includes(prop),
})<{ isActive: boolean; disabled?: boolean }>`
  padding: 10px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};

  ${({ disabled, theme }) =>
    disabled &&
    css`
      color: ${(theme as any).colors.shadowDark};
      cursor: not-allowed;
      background: ${(theme as any).colors.hoverBg};
    `}

  ${({ isActive, theme }) =>
    isActive &&
    css`
      font-weight: 600;
      color: ${theme.colors.primary};
    `}

  ${({ disabled, theme }) =>
    !disabled &&
    css`
      &:hover {
        background: ${(theme as any).colors.hoverBg};
      }
    `}
`;

export const ComboBoxEmpty = styled.div`
  padding: 12px;
  text-align: center;
  color: ${({ theme }) => (theme as any).colors.shadowDark};
  font-size: 14px;
`;
