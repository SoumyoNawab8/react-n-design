import styled, { css } from 'styled-components';

const sizes = {
  small: { height: '36px', fontSize: '14px', padding: '0 12px' },
  medium: { height: '48px', fontSize: '16px', padding: '0 16px' },
  large: { height: '56px', fontSize: '18px', padding: '0 20px' },
};

// This is the outermost container for the label, input group, and error message
export const InputContainer = styled.div<{ fullWidth: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
`;

export const StyledLabel = styled.label`
  font-size: 14px;
  /* 2. Access theme from props */
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
`;

export const ErrorText = styled.p`
  font-size: 12px;
  color: #e53e3e;
  margin: 0;
`;

// This container is only used when addons are present
export const InputGroupWrapper = styled.div`
  display: flex;
  align-items: stretch; // Ensures children have same height
  width: 100%;

  /* --- STYLING FIX FOR SEAMLESS ADDONS --- */

  /* Flatten the right side of the input when it's not the last element */
  & > div:first-child:not(:last-child) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  
  /* Flatten the left side of the addon when it comes after the input */
  & > .input-addon:last-child:not(:first-child) {
    margin-left: -2px; /* Overlap to hide seams */
    z-index: 1;

    & > div, & > div > button { // Target the Button's motion.div and the button itself
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }

  /* Flatten the right side of the addon when it comes before the input */
  & > .input-addon:first-child:not(:last-child) {
    margin-right: -2px;
    z-index: 1;

    & > div, & > div > button {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
`;

export const InputAddon = styled.div`
  display: flex;
  align-items: stretch;
`;

// This is the main neomorphic element
export const InputInnerWrapper = styled.div<{
  size: 'small' | 'medium' | 'large';
  hasError: boolean;
  disabled: boolean;
}>`
  display: flex;
  align-items: center;
  width: 100%;
  position: relative; // Needed for z-index context with addons
  /* 3. Access all theme values from props */
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.softInset};
  transition: box-shadow 0.2s ease-in-out;
  height: ${({ size }) => sizes[size].height};
  padding: ${({ size }) => sizes[size].padding};
  gap: 8px;

  ${({ hasError, theme }) => hasError && css`
    box-shadow: ${theme.shadows.softInset}, 0 0 0 2px #e53e3e90 !important;
  `}
  
  &:focus-within {
    z-index: 2; // Bring input to the front on focus
    box-shadow: ${({ theme }) => theme.shadows.softInset}, 0 0 0 2px ${({ hasError, theme }) => (hasError ? '#e53e3e' : theme.colors.primary)}40;
  }
`;

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
`;

export const InputPrefix = styled(IconWrapper)``;
export const InputSuffix = styled(IconWrapper)``;

export const ClearIcon = styled(IconWrapper)`
  cursor: pointer;
  font-size: 1.2em;
  color: #aaa;
  &:hover { color: #555; }
`;
export const PasswordToggleIcon = styled(IconWrapper)`
  cursor: pointer;
`;

export const StyledInput = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background: transparent;
  font-size: inherit;
  color: ${({ theme }) => theme.colors.text};

  &::placeholder {
    color: #a0a5b0;
  }
`;