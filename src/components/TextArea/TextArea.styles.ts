import styled, { css } from 'styled-components';

const sizes = {
  small: { minHeight: '60px', fontSize: '14px', padding: '8px 12px' },
  medium: { minHeight: '80px', fontSize: '16px', padding: '12px 16px' },
  large: { minHeight: '100px', fontSize: '18px', padding: '16px 20px' },
};

export const TextAreaContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !['fullWidth'].includes(prop),
})<{ fullWidth: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
`;

export const StyledLabel = styled.label`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
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

export const TextAreaWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => !['size', 'hasError', 'disabled', 'readOnly', 'isFocused'].includes(prop),
})<{
  size: 'small' | 'medium' | 'large';
  hasError: boolean;
  disabled: boolean;
  readOnly: boolean;
  isFocused: boolean;
}>`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  background: ${({ theme, disabled }) =>
    disabled ? theme.colors.cardBg : theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.softInset};
  transition: box-shadow 0.2s ease-in-out;
  min-height: ${({ size }) => sizes[size].minHeight};
  padding: ${({ size }) => sizes[size].padding};
  box-sizing: border-box;

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
  
  ${({ readOnly, theme }) =>
    readOnly &&
    css`
    background: ${theme.colors.cardBg};
  `}
`;

export const StyledTextArea = styled.textarea`
  width: 100%;
  min-height: inherit;
  border: none;
  outline: none;
  background: transparent;
  font-size: inherit;
  font-family: inherit;
  color: ${({ theme }) => theme.colors.text};
  resize: vertical;
  box-sizing: border-box;
  line-height: 1.5;

  &::placeholder {
    color: #a0a5b0;
  }

  &:disabled {
    cursor: not-allowed;
  }

  &:read-only {
    cursor: default;
  }
`;

export const CharacterCounter = styled.div.withConfig({
  shouldForwardProp: (prop) => !['nearLimit', 'atLimit'].includes(prop),
})<{ nearLimit: boolean; atLimit: boolean }>`
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
