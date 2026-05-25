'use client';
import { motion } from 'framer-motion';
import styled from 'styled-components';

export const CommandPaletteOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 1200;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 15vh;
`;

export const CommandPaletteWrapper = styled(motion.div)`
  width: 90vw;
  max-width: 560px;
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  overflow: hidden;
  box-sizing: border-box;
  outline: none;
`;

export const CommandPaletteInputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  border-bottom: 1px solid ${({ theme }) => (theme as any).colors.shadowDark}30;
  color: ${({ theme }) => theme.colors.text};
  font-size: 18px;
`;

export const CommandPaletteInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};

  &::placeholder {
    color: ${({ theme }) => (theme as any).colors.shadowDark};
  }
`;

export const CommandPaletteList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 8px;
  max-height: 400px;
  overflow-y: auto;
`;

export const CommandPaletteItem = styled.li.withConfig({
  shouldForwardProp: (prop) => !['isSelected'].includes(prop),
})<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.12s ease;
  background: ${({ isSelected, theme }) =>
    isSelected ? (theme as any).colors.hoverBg : 'transparent'};
  color: ${({ theme }) => theme.colors.text};
  outline: none;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: -2px;
  }
`;

export const CommandPaletteItemLabel = styled.span`
  font-size: 14px;
  font-weight: 500;
`;

export const CommandPaletteItemShortcut = styled.kbd`
  font-family: inherit;
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => (theme as any).colors.shadowDark};
  background: ${({ theme }) => theme.colors.background};
  box-shadow: ${({ theme }) => (theme as any).shadows.softInset};
  padding: 2px 8px;
  border-radius: 6px;
  white-space: nowrap;
`;

export const CommandPaletteEmpty = styled.div`
  padding: 24px;
  text-align: center;
  font-size: 14px;
  color: ${({ theme }) => (theme as any).colors.shadowDark};
`;
