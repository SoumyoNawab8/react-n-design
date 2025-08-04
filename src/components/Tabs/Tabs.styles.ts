import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

const sizes = {
  small: { padding: '8px 12px', fontSize: '14px' },
  medium: { padding: '12px 20px', fontSize: '16px' },
  large: { padding: '16px 24px', fontSize: '18px' },
};

export const TabsWrapper = styled.div<{ tabPosition: 'top' | 'left' }>`
  width: 100%;
  display: flex;
  flex-direction: ${({ tabPosition }) => (tabPosition === 'left' ? 'row' : 'column')};
`;

export const TabBarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
`;

export const TabBarExtraContent = styled.div`
  margin-left: 16px;
`;

export const TabsList = styled.div<{
  type: 'line' | 'card';
  tabPosition: 'top' | 'left';
  centered: boolean;
}>`
  display: flex;
  justify-content: ${({ centered }) => (centered ? 'center' : 'flex-start')};
  flex-grow: 1;

  /* 2. Make borders theme-aware */
  ${({ tabPosition, type, theme }) =>
    tabPosition === 'left'
      ? css`
          flex-direction: column;
          border-right: ${type === 'line' ? `2px solid ${theme.colors.shadowDark}40` : 'none'};
          margin-right: 16px;
          border-bottom: none;
        `
      : css`
          flex-direction: row;
          border-bottom: ${type === 'line' ? `2px solid ${theme.colors.shadowDark}40` : 'none'};
          margin-bottom: ${type === 'line' ? '16px' : '0'};
        `}
`;

export const TabButton = styled.button<{
  isActive: boolean;
  typeStyle: 'line' | 'card';
  size: 'small' | 'medium' | 'large';
  tabPosition: 'top' | 'left';
}>`
  position: relative;
  border: none;
  background: transparent;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease-in-out;
  /* 3. Access theme from props for all colors */
  color: ${({ theme }) => theme.colors.text};
  white-space: nowrap;

  padding: ${({ size }) => sizes[size].padding};
  font-size: ${({ size }) => sizes[size].fontSize};

  ${({ typeStyle, isActive, theme }) =>
    typeStyle === 'card' &&
    css`
      border: 1px solid ${theme.colors.shadowDark}40;
      border-radius: 8px 8px 0 0;
      background: ${theme.colors.cardBg};
      margin-right: 2px;
      
      ${isActive &&
      css`
        background: ${theme.colors.background};
        border-bottom-color: transparent;
      `}
    `}

  ${({ isActive, theme }) =>
    isActive &&
    css`
      color: ${theme.colors.primary};
    `}
  
  &:disabled {
    color: #aaa;
    cursor: not-allowed;
    background: #f8f9fa; /* Neutral disabled color */
  }
`;

export const TabIndicator = styled(motion.div)<{ isVertical: boolean }>`
  position: absolute;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 2px;

  ${({ isVertical }) =>
    isVertical
      ? css`
          right: -2px;
          top: 0;
          bottom: 0;
          width: 2px;
        `
      : css`
          bottom: -2px;
          left: 0;
          right: 0;
          height: 2px;
        `}
`;

export const TabPanel = styled(motion.div)`
  padding: 8px;
  color: ${({ theme }) => theme.colors.text};
  flex-grow: 1;
`;