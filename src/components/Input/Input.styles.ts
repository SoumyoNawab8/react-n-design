import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

const sizes = {
  small: { height: '36px', fontSize: '14px', padding: '0 12px' },
  medium: { height: '48px', fontSize: '16px', padding: '0 16px' },
  large: { height: '56px', fontSize: '18px', padding: '0 20px' },
};

// This is the outermost container for the label, input group, and error message
export const InputContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !['fullWidth', 'hasFloatingLabel'].includes(prop),
})<{
  fullWidth: boolean;
  hasFloatingLabel: boolean;
}>`
  display: flex;
  flex-direction: column;
  gap: ${({ hasFloatingLabel }) => (hasFloatingLabel ? '4px' : '8px')};
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
`;

export const StyledLabel = styled.label`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
`;

export const FloatingLabel = styled(motion.label).withConfig({
  shouldForwardProp: (prop) =>
    !['size', 'isFloating', 'hasValue', 'htmlTag'].includes(prop),
})<{
  size: 'small' | 'medium' | 'large';
  isFloating: boolean;
  hasValue: boolean;
  htmlTag?: string;
}>`
  position: absolute;
  left: ${({ size }) => sizes[size].padding.split(' ')[1] || '16px'};
  top: 0;
  transform-origin: left top;
  pointer-events: ${({ isFloating }) => (isFloating ? 'auto' : 'none')};
  z-index: 1;
  font-size: ${({ theme: themeWithFont }) => (themeWithFont as any).font?.sizes?.body1 || '14px'};
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: calc(100% - 32px);
`;

export const ErrorText = styled.p`
  font-size: 12px;
  color: #e53e3e;
  margin: 0;
`;

export const HelperText = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.7;
  margin: 0;
`;

export const CharacterCounter = styled.div.withConfig({
  shouldForwardProp: (prop) => !['nearLimit', 'atLimit'].includes(prop),
})<{
  nearLimit: boolean;
  atLimit: boolean;
}>`
  font-size: 12px;
  color: ${({ nearLimit, atLimit, theme }) =>
    atLimit ? '#e53e3e' : nearLimit ? '#dd6b20' : theme.colors.text};
  opacity: ${({ nearLimit, atLimit }) => (nearLimit || atLimit ? 1 : 0.7)};
  text-align: right;
  margin-top: 4px;
  font-weight: ${({ nearLimit, atLimit }) => (nearLimit || atLimit ? '500' : 'normal')};
`;

export const FooterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 4px;
  gap: 8px;
`;

// This container is only used when addons are present
export const InputGroupWrapper = styled.div`
  display: flex;
  align-items: stretch;
  width: 100%;

  /* Flatten the right side of the input when it's not the last element */
  & > .input-inner:not(:last-child) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  /* Flatten the left side of the input when it's not the first element */
  & > .input-inner:not(:first-child) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  /* Flatten the left side of the addon when it comes after the input */
  & > .input-addon:last-child:not(:first-child) {
    margin-left: -2px;
    z-index: 1;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;

    & > div, & > div > button {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }

  /* Flatten the right side of the addon when it comes before the input */
  & > .input-addon:first-child:not(:last-child) {
    margin-right: -2px;
    z-index: 1;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;

    & > div, & > div > button {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
`;

export const InputAddon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.cardBg};
  box-shadow: ${({ theme }) => theme.shadows.softInset};
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 0 12px;
  color: ${({ theme }) => theme.colors.text};
  font-size: inherit;
  white-space: nowrap;
`;

// This is the main neomorphic element
export const InputInnerWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    !['size', 'hasError', 'disabled', 'isFocused', 'glassMorphism'].includes(prop),
})<{
  size: 'small' | 'medium' | 'large';
  hasError: boolean;
  disabled: boolean;
  isFocused: boolean;
  glassMorphism: boolean;
}>`
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;
  background: ${({ theme, disabled }) =>
    disabled ? theme.colors.cardBg : theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.softInset};
  transition: box-shadow 0.2s ease-in-out;
  height: ${({ size }) => sizes[size].height};
  padding: ${({ size, hasError, isFocused }) => {
    const basePadding = sizes[size].padding;
    // Add extra top padding for floating label when focused/has error
    const extraTop = (hasError || isFocused) ? ' 2px' : '';
    return basePadding.replace(/ 0 /g, ` ${extraTop || '0'} `);
  }};
  gap: 8px;
  box-sizing: border-box;

  ${({ glassMorphism, theme }) =>
    glassMorphism &&
    css`
    background: ${theme.colors.cardBg}90;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  `}

  ${({ hasError, theme }) =>
    hasError &&
    css`
    box-shadow: ${theme.shadows.softInset}, 0 0 0 2px #e53e3e90 !important;
  `}
  
  ${({ isFocused, hasError, theme }) =>
    isFocused &&
    css`
    z-index: 2;
    box-shadow: ${theme.shadows.softInset}, 0 0 0 2px ${hasError ? '#e53e3e' : theme.colors.primary}40;
  `}
  
  ${({ disabled, theme }) =>
    disabled &&
    css`
    cursor: not-allowed;
    opacity: 0.6;
  `}
`;

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text};
`;

export const InputPrefix = styled(IconWrapper)`
  color: ${({ theme }) => theme.colors.shadowDark};
`;
export const InputSuffix = styled(IconWrapper)`
  color: ${({ theme }) => theme.colors.shadowDark};
`;

export const ClearIcon = styled(IconWrapper).withConfig({
  shouldForwardProp: (prop) => !['size'].includes(prop),
})<{
  size: 'small' | 'medium' | 'large';
}>`
  cursor: pointer;
  font-size: 1.2em;
  color: ${({ theme }) => theme.colors.shadowDark};
  min-width: 44px;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: -8px; /* Negative margin to maintain visual spacing */
  padding: 8px;
  border-radius: 8px;
  transition: background-color 0.15s ease, color 0.15s ease;
  
  &:hover {
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.shadowLight}40;
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.shadowDark}40;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

export const PasswordToggleIcon = styled(IconWrapper)`
  cursor: pointer;
  min-width: 44px;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: -8px;
  padding: 8px;
  border-radius: 8px;
  transition: background-color 0.15s ease, color 0.15s ease;
  color: ${({ theme }) => theme.colors.shadowDark};
  
  &:hover {
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.shadowLight}40;
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.shadowDark}40;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

export const StyledInput = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background: transparent;
  font-size: inherit;
  color: ${({ theme }) => theme.colors.text};
  box-sizing: border-box;

  &::placeholder {
    color: #a0a5b0;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;
