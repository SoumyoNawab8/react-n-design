import styled, { css } from 'styled-components';
import { motion } from '../../utils/lazyMotion';

const sizes = {
  small: { padding: '8px 12px', fontSize: '14px' },
  medium: { padding: '12px 20px', fontSize: '16px' },
  large: { padding: '16px 24px', fontSize: '18px' },
};

export const TabsWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => !['tabPosition'].includes(prop),
})<{ tabPosition: 'top' | 'bottom' | 'left' | 'right' }>`
  width: 100%;
  display: flex;
  flex-direction: ${({ tabPosition }) => {
    switch (tabPosition) {
      case 'left':
      case 'right':
        return 'row';
      case 'bottom':
        return 'column-reverse';
      case 'top':
      default:
        return 'column';
    }
  }};
`;

export const TabBarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  position: relative;
`;

export const TabsContainer = styled.div`
  position: relative;
  flex-grow: 1;
  display: flex;
`;

export const TabBarExtraContent = styled.div`
  margin-left: 16px;
  flex-shrink: 0;
`;

export const OverflowShadow = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isVertical', 'position'].includes(prop),
})<{ isVertical: boolean; position: 'start' | 'end' }>`
  position: absolute;
  pointer-events: none;
  z-index: 10;
  
  ${({ isVertical, position, theme }) =>
    isVertical
      ? css`
          ${position}: 0;
          left: 0;
          right: 0;
          height: 24px;
          background: linear-gradient(
            ${position === 'start' ? 'to bottom' : 'to top'},
            ${theme.colors.background}FF 0%,
            ${theme.colors.background}00 100%
          );
        `
      : css`
          ${position}: 0;
          top: 0;
          bottom: 0;
          width: 24px;
          background: linear-gradient(
            ${position === 'start' ? 'to right' : 'to left'},
            ${theme.colors.background}FF 0%,
            ${theme.colors.background}00 100%
          );
        `}
`;

export const TabsList = styled.div.withConfig({
  shouldForwardProp: (prop) => !['type', 'tabPosition', 'centered', 'overflow'].includes(prop),
})<{
  type: 'line' | 'card';
  tabPosition: 'top' | 'bottom' | 'left' | 'right';
  centered: boolean;
  overflow: 'auto' | 'scroll' | 'wrap';
}>`
  display: flex;
  justify-content: ${({ centered }) => (centered ? 'center' : 'flex-start')};
  flex-grow: 1;
  position: relative;
  overflow-x: ${({ overflow, tabPosition }) => 
    tabPosition === 'left' || tabPosition === 'right' ? 'hidden' : overflow === 'scroll' ? 'scroll' : overflow === 'wrap' ? 'visible' : 'auto'
  };
  overflow-y: ${({ overflow, tabPosition }) => 
    tabPosition === 'left' || tabPosition === 'right' ? (overflow === 'scroll' ? 'scroll' : overflow === 'wrap' ? 'visible' : 'auto') : 'hidden'
  };
  flex-wrap: ${({ overflow }) => overflow === 'wrap' ? 'wrap' : 'nowrap'};
  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => `${theme.colors.shadowDark}40 transparent`};
  
  &::-webkit-scrollbar {
    ${({ tabPosition }) => 
      tabPosition === 'left' || tabPosition === 'right'
        ? css`width: 4px;`
        : css`height: 4px;`
    }
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => `${theme.colors.shadowDark}40`};
    border-radius: 2px;
  }
  
  @media (max-width: 768px) {
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  /* Border positioning based on tab position */
  ${({ tabPosition, type, theme }) => {
    if (type !== 'line') return css``;
    
    switch (tabPosition) {
      case 'left':
        return css`
          flex-direction: column;
          border-right: 2px solid ${theme.colors.shadowDark}40;
          margin-right: 16px;
        `;
      case 'right':
        return css`
          flex-direction: column;
          border-left: 2px solid ${theme.colors.shadowDark}40;
          margin-left: 16px;
          order: 1;
        `;
      case 'bottom':
        return css`
          flex-direction: row;
          border-top: 2px solid ${theme.colors.shadowDark}40;
          margin-top: 16px;
        `;
      case 'top':
      default:
        return css`
          flex-direction: row;
          border-bottom: 2px solid ${theme.colors.shadowDark}40;
          margin-bottom: ${type === 'line' ? '16px' : '0'};
        `;
    }
  }}
`;

export const TabButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !['isActive', 'typeStyle', 'size', 'tabPosition'].includes(prop),
})<{
  isActive: boolean;
  typeStyle: 'line' | 'card';
  size: 'small' | 'medium' | 'large';
  tabPosition: 'top' | 'bottom' | 'left' | 'right';
}>`
  position: relative;
  border: none;
  background: transparent;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease-in-out;
  color: ${({ theme }) => theme.colors.text};
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  padding: ${({ size }) => sizes[size].padding};
  font-size: ${({ size }) => sizes[size].fontSize};

  /* Card variant styles */
  ${({ typeStyle, isActive, theme, tabPosition }) =>
    typeStyle === 'card' &&
    css`
      border: 1px solid ${theme.colors.shadowDark}40;
      background: ${theme.colors.cardBg};
      margin-right: ${tabPosition === 'left' || tabPosition === 'right' ? '0' : '2px'};
      margin-bottom: ${tabPosition === 'left' || tabPosition === 'right' ? '2px' : '0'};
      
      ${(() => {
        switch (tabPosition) {
          case 'left':
            return css`border-radius: 8px 0 0 8px;`;
          case 'right':
            return css`border-radius: 0 8px 8px 0;`;
          case 'bottom':
            return css`border-radius: 0 0 8px 8px;`;
          case 'top':
          default:
            return css`border-radius: 8px 8px 0 0;`;
        }
      })()}
      
      ${isActive &&
      css`
        background: ${theme.colors.background};
        ${(() => {
          switch (tabPosition) {
            case 'left':
              return css`border-right-color: transparent;`;
            case 'right':
              return css`border-left-color: transparent;`;
            case 'bottom':
              return css`border-top-color: transparent;`;
            case 'top':
            default:
              return css`border-bottom-color: transparent;`;
          }
        })()}
      `}
    `}

  /* Active state coloring */
  ${({ isActive, theme }) =>
    isActive &&
    css`
      color: ${theme.colors.primary};
    `}
  
  &:disabled {
    color: ${({ theme }) => theme.colors.shadowDark};
    cursor: not-allowed;
    background: ${({ theme }) => theme.colors.hoverBg};
  }

  /* Hover effects */
  &:hover:not(:disabled) {
    color: ${({ theme, isActive }) => (isActive ? theme.colors.primary : theme.colors.text)};
    background: ${({ theme, typeStyle }) =>
      typeStyle === 'card' ? theme.colors.hoverBg : 'transparent'};
  }
`;

export const TabBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  margin-left: 8px;
  font-size: 12px;
  font-weight: 500;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  transition: all 0.2s ease;
`;

export const TabIndicator = styled(motion.div).withConfig({
  shouldForwardProp: (prop) => !['isVertical'].includes(prop),
})<{ isVertical: boolean }>`
  position: absolute;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 2px;

  ${({ isVertical }) =>
    isVertical
      ? css`
          width: 2px;
          top: 4px;
          bottom: 4px;
          right: -2px;
        `
      : css`
          height: 2px;
          left: 4px;
          right: 4px;
          bottom: -2px;
        `}
`;

export const TabPanel = styled(motion.div)`
  padding: 8px;
  color: ${({ theme }) => theme.colors.text};
  flex-grow: 1;
  min-height: 0;
`;
