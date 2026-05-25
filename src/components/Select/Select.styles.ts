import { motion } from '../../utils/lazyMotion';
import styled, { css, keyframes } from 'styled-components';

const sizes = {
  small: { height: '36px', fontSize: '14px', padding: '6px 12px' },
  medium: { height: '48px', fontSize: '16px', padding: '8px 16px' },
  large: { height: '56px', fontSize: '18px', padding: '10px 20px' },
};

export const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 300px;
  /* 2. Access theme from props */
  color: ${({ theme }) => theme.colors.text};
`;

// This wrapper handles the layout of tags in multi-select mode.
export const MultiSelectValueWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  flex-grow: 1;
`;

export const SelectTrigger = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    !['size', 'isOpen', 'hasError', 'disabled', 'isMulti'].includes(prop),
})<{
  size: 'small' | 'medium' | 'large';
  isOpen: boolean;
  hasError: boolean;
  disabled: boolean;
  isMulti: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
  cursor: pointer;
  /* 3. Access all theme values from props */
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => (theme as any).shadows.softInset};
  transition: all 0.2s ease-in-out;
  
  min-height: ${({ size }) => sizes[size].height};
  height: auto;
  padding: ${({ size }) => sizes[size].padding};
  font-size: ${({ size }) => sizes[size].fontSize};

  box-sizing: border-box;

  ${({ isMulti }) =>
    isMulti &&
    css`
    align-items: flex-start;
    padding-top: 8px;
    padding-bottom: 8px;
  `}
  
  ${({ isOpen, hasError, theme }) =>
    (isOpen || hasError) &&
    css`
    box-shadow: ${(theme as any).shadows.softInset}, 0 0 0 2px ${hasError ? '#e53e3e' : theme.colors.primary}40;
  `}

  ${({ disabled, theme }) =>
    disabled &&
    css`
    cursor: not-allowed;
    background-color: ${(theme as any).colors.hoverBg};
  `}
`;

export const SelectValue = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-grow: 1;
`;

export const SelectPlaceholder = styled(SelectValue)`
  color: ${({ theme }) => (theme as any).colors.shadowDark};
`;

export const SelectIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
`;

export const SelectChevron = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isOpen'].includes(prop),
})<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  transition: transform 0.2s;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

export const ClearButton = styled.span`
  display: flex;
  align-items: center;
  color: ${({ theme }) => (theme as any).colors.shadowDark};
  &:hover { color: ${({ theme }) => theme.colors.text}; }
`;

export const SelectDropdown = styled(motion.div)`
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

export const SelectOption = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isActive', 'disabled'].includes(prop),
})<{ isActive: boolean; disabled?: boolean }>`
  padding: 10px 12px;
  border-radius: 8px;
  cursor: pointer;
  
  ${({ disabled }) =>
    disabled &&
    css`
    color: #aaa;
    cursor: not-allowed;
    background: #f8f9fa;
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

const spin = keyframes`to { transform: rotate(360deg); }`;
export const Spinner = styled.div`
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-top-color: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  width: 1em;
  height: 1em;
  animation: ${spin} 0.8s linear infinite;
`;
