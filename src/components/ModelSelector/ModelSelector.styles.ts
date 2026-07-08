'use client';
import styled from 'styled-components';
import { motion } from '../../utils/lazyMotion';
import { iconColor } from '../../styles/iconColor';

export const ModelSelectorWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
  color: ${({ theme }) => theme.colors.text};
`;

export const ModelTrigger = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isOpen',
})<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  cursor: pointer;
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius};
  transition: all 0.2s ease-in-out;
  min-height: 48px;
  padding: 10px 16px;
  font-size: 16px;
  box-sizing: border-box;
  box-shadow: ${({ theme }) => theme.shadows.softInset};

  ${({ isOpen, theme }) =>
    isOpen &&
    `
      box-shadow: ${theme.shadows.softInset}, 0 0 0 2px ${theme.colors.primary}40;
    `}

  &:hover {
    background: ${({ theme }) => theme.colors.hoverBg};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

export const ModelTriggerContent = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-grow: 1;
  min-width: 0;
`;

export const ModelTriggerText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  overflow: hidden;
`;

export const ModelTriggerSubtext = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const SelectChevron = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isOpen',
})<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  color: ${({ theme }) => theme.colors.shadowDark};
  flex-shrink: 0;
  ${iconColor}
`;

export const ModelDropdown = styled(motion.div)`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  width: 100%;
  z-index: 800;
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  overflow: hidden;
  max-height: 400px;
  overflow-y: auto;
`;

export const ModelOption = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isActive', 'isHighlighted'].includes(prop),
})<{ isActive: boolean; isHighlighted: boolean }>`
  padding: 12px;
  cursor: pointer;
  transition: all 0.15s ease-out;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border}40;

  &:last-child {
    border-bottom: none;
  }

  ${({ isActive, theme }) =>
    isActive &&
    `
      background: ${theme.colors.primary}10;
    `}

  ${({ isHighlighted, theme }) =>
    isHighlighted &&
    `
      outline: 2px solid ${theme.colors.primary};
      outline-offset: -2px;
    `}

  &:hover {
    background: ${({ theme }) => theme.colors.hoverBg};
  }
`;

export const ModelOptionContent = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
`;

export const ModelOptionName = styled.div`
  font-weight: 600;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
`;

export const ModelOptionProvider = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const ModelOptionDescription = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: 4px;
  line-height: 1.4;
`;

export const ModelOptionMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  flex-wrap: wrap;
`;

export const ModelMetaItem = styled.span`
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 6px;
  background: ${({ theme }) => theme.colors.cardBg};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const LatencyBadge = styled.span.withConfig({
  shouldForwardProp: (prop) => prop !== 'color',
})<{ color?: 'green' | 'yellow' | 'red' }>`
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 6px;
  font-weight: 600;
  background: ${({ color }) => {
    switch (color) {
      case 'green':
        return '#28a74520';
      case 'yellow':
        return '#ffc10720';
      case 'red':
        return '#dc354520';
      default:
        return 'transparent';
    }
  }};
  color: ${({ color, theme }) => {
    switch (color) {
      case 'green':
        return '#28a745';
      case 'yellow':
        return '#b7950b';
      case 'red':
        return '#dc3545';
      default:
        return theme.colors.textSecondary;
    }
  }};
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px 16px;
  gap: 8px;
  color: ${({ theme }) => theme.colors.shadowDark};
`;

export const EmptyStateText = styled.div`
  font-size: 14px;
  text-align: center;
`;
