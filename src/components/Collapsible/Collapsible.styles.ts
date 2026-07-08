import styled from 'styled-components';
import { motion } from '../../utils/lazyMotion';
import { iconColor } from '../../styles/iconColor';

export const CollapsibleWrapper = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  background: ${({ theme }) => theme.colors.background};
  overflow: hidden;
`;

export const CollapsibleTrigger = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  cursor: pointer;
  background: transparent;
  border: none;
  font-size: 16px;
  font-weight: 600;
  text-align: left;
  transition: color 0.2s ease;
  color: ${({ theme }) => theme.colors.text};

  &:hover:not(:disabled) {
    color: ${({ theme }) => theme.colors.primary};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  &[aria-disabled='true'] {
    cursor: not-allowed;
    opacity: 0.6;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: -2px;
    position: relative;
    z-index: 1;
  }

  /* Ensure content of custom triggers still respects disabled state */
  ~ * {
    pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
  }
`;

export const CollapsibleChevron = styled(motion.div).withConfig({
  shouldForwardProp: (prop) => !['isOpen'].includes(prop),
})<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  transform-origin: center;
  flex-shrink: 0;
  margin-left: 16px;
  color: currentColor;
  ${iconColor}

  svg {
    display: block;
  }
`;

export const CollapsibleContent = styled(motion.div)<{ isOpen?: boolean }>`
  overflow: hidden;
  color: ${({ theme }) => theme.colors.text};
  will-change: height, opacity;
`;

export const CollapsibleContentWrapper = styled.div`
  padding: 4px 20px 20px 20px;

  /* Add spacing for nested collapsibles */
  > ${CollapsibleWrapper}:not(:last-child) {
    margin-bottom: 12px;
  }
`;
