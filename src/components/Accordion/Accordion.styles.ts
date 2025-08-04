import styled, { css, DefaultTheme } from 'styled-components';
import { motion } from 'framer-motion';

// Extend DefaultTheme to include 'colors', 'borderRadius', and 'shadows' if not already defined
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      text: string;
      background: string;
    };
    borderRadius: string;
    shadows: {
      soft: string;
    };
  }
}

export const AccordionWrapper = styled.div<{ bordered: boolean }>`
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  background: ${({ theme }) => theme.colors.background};
  overflow: hidden;
  ${({ bordered }) =>
    bordered &&
    css`
      border: 1px solid #d1d9e6;
    `}
`;

export const AccordionItem = styled.div<{ isLast: boolean }>`
  ${({ isLast }) =>
    !isLast &&
    css`
      border-bottom: 1px solid #d1d9e6;
    `}
`;

export const AccordionHeader = styled.button<{ isActive: boolean }>`
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
  transition: color 0.2s;

  color: ${({ isActive, theme }) => (isActive ? theme.colors.primary : theme.colors.text)};

  &:disabled {
    color: #aaa;
    cursor: not-allowed;
  }
`;

export const AccordionLabel = styled.span``;

export const AccordionChevron = styled(motion.div)`
  display: flex;
  align-items: center;
  font-size: 14px;
`;

export const AccordionPanel = styled(motion.div)`
  overflow: hidden;

  /* Inner div provides padding */
  & > div {
    padding: 4px 20px 20px 20px;
    color: ${({ theme }) => theme.colors.text};
  }
`;