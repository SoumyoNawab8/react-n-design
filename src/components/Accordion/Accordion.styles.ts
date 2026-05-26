import styled, { css } from 'styled-components';
import { motion } from '../../utils/lazyMotion';

export const AccordionWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'bordered',
})<{ bordered: boolean }>`
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows?.soft || '0 2px 8px rgba(0,0,0,0.1)'};
  background: ${({ theme }) => theme.colors?.background || '#fff'};
  overflow: hidden;
  max-width: 100%;
  
  ${({ bordered, theme }) =>
    bordered &&
    css`
      border: 1px solid ${theme.colors?.shadowDark ? `${theme.colors.shadowDark}40` : '#ddd'};
    `}
`;

export const AccordionItem = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isLast',
})<{ isLast: boolean }>`
  ${({ isLast, theme }) =>
    !isLast &&
    css`
      border-bottom: 1px solid ${theme.colors?.shadowDark ? `${theme.colors.shadowDark}40` : '#ddd'};
    `}
`;

export const AccordionHeader = styled.button.withConfig({
  shouldForwardProp: (prop) => !['isActive'].includes(prop),
})<{ isActive: boolean }>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  background: ${({ isActive, theme }) => 
    isActive 
      ? (theme.colors?.hoverBg || 'rgba(0,0,0,0.05)') 
      : 'transparent'};
  border: none;
  font-size: 16px;
  font-weight: 600;
  text-align: left;
  transition: all 0.2s ease;
  color: ${({ isActive, theme, disabled }) => {
    if (disabled) return theme.colors?.shadowDark || '#999';
    return isActive ? theme.colors?.primary || '#1890ff' : theme.colors?.text || '#333';
  }};

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors?.hoverBg || 'rgba(0,0,0,0.05)'};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors?.primary || '#1890ff'};
    outline-offset: -2px;
    position: relative;
    z-index: 1;
  }
  
  &:disabled {
    color: ${({ theme }) => theme.colors?.shadowDark || '#999'};
    cursor: not-allowed;
    opacity: 0.6;
  }

  &[aria-disabled="true"] {
    color: ${({ theme }) => theme.colors?.shadowDark || '#999'};
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export const AccordionLabel = styled.span`
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const AccordionChevron = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  margin-left: 16px;
  flex-shrink: 0;
  
  svg {
    display: block;
  }
`;

export const AccordionPanel = styled(motion.div)`
  overflow: hidden;
  background: ${({ theme }) => theme.colors?.background || 'transparent'};

  /* Inner div provides padding */
  & > div {
    padding: 4px 20px 20px 20px;
    color: ${({ theme }) => theme.colors?.text || '#333'};
    line-height: 1.5;
  }
`;
