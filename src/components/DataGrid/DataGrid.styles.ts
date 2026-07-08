'use client';
import styled, { css, keyframes } from 'styled-components';
import { iconColor } from '../../styles/iconColor';

const skeletonPulse = keyframes`
  0%, 100% { opacity: 0.7; }
  50% { opacity: 0.4; }
`;

const skeletonShimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const expandAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(-8px);
    max-height: 0;
  }
  to {
    opacity: 1;
    transform: translateY(0);
    max-height: 500px;
  }
`;

const springExpand = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-10px) scale(0.98);
    max-height: 0;
    padding: 0 16px;
  }
  60% {
    transform: translateY(2px) scale(1.005);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
    max-height: 1000px;
    padding: 16px;
  }
`;

export const GridWrapper = styled.div<{ variant?: 'default' | 'minimal' | 'glass' }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  overflow: hidden;
  outline: none;

  ${({ variant }) =>
    variant === 'minimal' &&
    css`
      box-shadow: none;
      border: none;
      background: transparent;
    `}

  ${({ variant }) =>
    variant === 'glass' &&
    css`
      background: ${({ theme }) => `${theme.colors.cardBg}80`};
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid ${({ theme }) => `${theme.colors.border}40`};
    `}
`;

export const GridHeaderContainer = styled.div<{ variant?: 'default' | 'minimal' | 'glass' }>`
  overflow-x: auto;
  overflow-y: hidden;
  background: ${({ theme }) => theme.colors.cardBg};
  box-shadow: ${({ theme }) => theme.shadows.softInset};
  border-bottom: 1px solid ${({ theme }) => theme.colors.shadowDark}40;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;

  ${({ variant, theme }) =>
    variant === 'glass' &&
    css`
      background: ${theme.colors.cardBg}90;
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      border-bottom: 1px solid ${theme.colors.border}30;
    `}

  ${({ variant }) =>
    variant === 'minimal' &&
    css`
      background: transparent;
      border-bottom: 1px solid ${({ theme }) => theme.colors.border}20;
      box-shadow: none;
    `}
`;

export const GridHeaderRow = styled.div<{ variant?: 'default' | 'minimal' | 'glass' }>`
  display: flex;
  min-width: max-content;

  ${({ variant }) =>
    variant === 'minimal' &&
    css`
      border-bottom: 1px solid ${({ theme }) => theme.colors.border}15;
    `}
`;

export const GridHeaderCell = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    !['isSortable', 'isSorted', 'width', 'isPinned', 'pinnedLeftWidth', 'pinnedRightWidth', 'variant', 'isResizing'].includes(
      String(prop)
    ),
})<{
  isSortable?: boolean;
  isSorted?: boolean;
  width?: number;
  isPinned?: 'left' | 'right';
  pinnedLeftWidth?: number;
  pinnedRightWidth?: number;
  variant?: 'default' | 'minimal' | 'glass';
}>`
  position: relative;
  display: flex;
  align-items: center;
  padding: 12px 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  white-space: nowrap;
  flex-shrink: 0;
  width: ${({ width }) => (width ? `${width}px` : '150px')};
  min-width: ${({ width }) => (width ? `${width}px` : '150px')};
  cursor: ${({ isSortable }) => (isSortable ? 'pointer' : 'default')};
  user-select: none;
  box-sizing: border-box;
  background: ${({ theme }) => theme.colors.cardBg};
  z-index: ${({ isPinned }) => (isPinned ? 10 : 1)};
  transition: box-shadow 0.2s ease;

  ${({ isPinned, pinnedLeftWidth, pinnedRightWidth }) =>
    isPinned === 'left' &&
    css`
      position: sticky;
      left: ${pinnedLeftWidth ? `${pinnedLeftWidth}px` : '0'};
      box-shadow: 2px 0 8px rgba(0, 0, 0, 0.08);
    `}

  ${({ isPinned, pinnedRightWidth }) =>
    isPinned === 'right' &&
    css`
      position: sticky;
      right: ${pinnedRightWidth ? `${pinnedRightWidth}px` : '0'};
      box-shadow: -2px 0 8px rgba(0, 0, 0, 0.08);
    `}

  ${({ isSortable, theme }) =>
    isSortable &&
    css`
      &:hover {
        color: ${theme.colors.primary};
      }
    `}

  ${({ variant }) =>
    variant === 'minimal' &&
    css`
      background: transparent;
      border-right: none;
    `}

  ${({ variant, theme }) =>
    variant === 'glass' &&
    css`
      background: ${theme.colors.cardBg}80;
    `}
`;

export const ResizeHandle = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isResizing',
})<{ isResizing?: boolean }>`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  cursor: col-resize;
  background: transparent;
  z-index: 2;
  transition: background-color 0.15s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
  }

  ${({ isResizing, theme }) =>
    isResizing &&
    css`
      background: ${theme.colors.primary};
      cursor: col-resize;
    `}
`;

export const SortIconWrapper = styled.span`
  display: inline-flex;
  margin-left: 8px;
  opacity: 0.6;
  font-size: 0.85em;
  ${iconColor}
`;

export const FilterButton = styled.button`
  background: none;
  border: none;
  padding: 4px;
  margin-left: 8px;
  cursor: pointer;
  color: inherit;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius};
  ${iconColor}

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const FilterPopover = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  z-index: 800;
  padding: 8px;
  background: ${({ theme }) => theme.colors.cardBg};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  border-radius: ${({ theme }) => theme.borderRadius};
  min-width: 200px;
`;

export const FilterInput = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  box-shadow: ${({ theme }) => theme.shadows.softInset};
  outline: none;
  box-sizing: border-box;
  &:focus {
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}40;
  }
`;

export const GridBodyWrapper = styled.div`
  flex: 1;
  position: relative;
  min-height: 200px;
`;

export const GridRow = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isSelected', 'isExpanded'].includes(prop),
})<{
  isSelected?: boolean;
  isExpanded?: boolean;
}>`
  display: flex;
  flex-direction: column;
  background: ${({ theme, isSelected }) =>
    isSelected ? `${theme.colors.primary}15` : theme.colors.background};
  transition: background-color 0.2s;
  border-bottom: 1px solid ${({ theme }) => theme.colors.shadowDark}20;
  &:hover {
    background: ${({ theme, isSelected }) =>
      isSelected ? `${theme.colors.primary}25` : theme.colors.hoverBg};
  }
`;

export const GridCellsRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const cellBaseStyles = css`
  flex-shrink: 0;
  padding: 12px 16px;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  outline: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
  box-sizing: border-box;
`;

export const GridCell = styled.div.withConfig({
  shouldForwardProp: (prop) => !['width', 'isActive'].includes(prop),
})<{
  width?: number;
  isActive?: boolean;
}>`
  ${cellBaseStyles}
  width: ${({ width }) => (width ? `${width}px` : '150px')};
  min-width: ${({ width }) => (width ? `${width}px` : '150px')};

  ${({ isActive, theme }) =>
    isActive &&
    css`
      box-shadow: inset 0 0 0 2px ${theme.colors.primary}80;
    `}
`;

export const PinnedLeftCell = styled(GridCell)`
  position: sticky;
  left: 0;
  background: inherit;
  z-index: 5;
  box-shadow: 2px 0 6px rgba(0, 0, 0, 0.06);
`;

export const PinnedRightCell = styled(GridCell)`
  position: sticky;
  right: 0;
  background: inherit;
  z-index: 5;
  box-shadow: -2px 0 6px rgba(0, 0, 0, 0.06);
`;

export const ExpandIconWrapper = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'isExpanded',
})<{ isExpanded?: boolean }>`
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  color: inherit;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius};
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  ${iconColor}

  ${({ isExpanded }) =>
    isExpanded &&
    css`
      transform: rotate(90deg);
    `}

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const ExpandableContent = styled.div<{ isExpanded?: boolean }>`
  padding: 16px;
  background: ${({ theme }) => theme.colors.cardBg};
  color: ${({ theme }) => theme.colors.text};
  width: 100%;
  box-sizing: border-box;
  box-shadow: ${({ theme }) => theme.shadows.softInset};
  overflow: hidden;
  animation: ${springExpand} 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.8;
  text-align: center;
  padding: 32px;
`;

export const EmptyStateIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.6;
  ${iconColor}
`;

export const EmptyStateTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: ${({ theme }) => theme.colors.text};
`;

export const SkeletonRow = styled.div`
  display: flex;
  background: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.shadowDark}20;
`;

export const SkeletonCell = styled.div`
  flex: 1;
  padding: 12px 16px;
  margin: 8px;
  border-radius: ${({ theme }) => theme.borderRadius};
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.skeletonBg} 25%,
    ${({ theme }) => theme.colors.hoverBg} 50%,
    ${({ theme }) => theme.colors.skeletonBg} 75%
  );
  background-size: 200% 100%;
  min-height: 24px;
  animation: ${skeletonShimmer} 1.5s ease-in-out infinite;
`;

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
  padding: 12px 16px;
  border-top: 1px solid ${({ theme }) => theme.colors.shadowDark}20;
`;

export const PageSizeSelect = styled.select`
  padding: 4px 8px;
  border-radius: ${({ theme }) => theme.borderRadius};
  border: none;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  box-shadow: ${({ theme }) => theme.shadows.softInset};
  cursor: pointer;
  outline: none;
`;

export const CheckboxWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

export const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.background}b3;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  border-radius: ${({ theme }) => theme.borderRadius};
`;

// Toolbar Components
export const ToolbarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border}20;
  background: ${({ theme }) => theme.colors.background};
`;

export const MobileToolbar = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  justify-content: flex-end;
`;

export const MobileColumnMenuButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border: 1px solid ${({ theme }) => theme.colors.border}40;
  border-radius: ${({ theme }) => theme.borderRadius};
  background: ${({ theme }) => theme.colors.cardBg};
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary}60;
    background: ${({ theme }) => theme.colors.primary}10;
  }

  @media (min-width: 768px) {
    display: none;
  }
`;

export const MobileColumnMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 16px;
  z-index: 100;
  background: ${({ theme }) => theme.colors.cardBg};
  border: 1px solid ${({ theme }) => theme.colors.border}40;
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  padding: 8px;
  min-width: 200px;
  animation: ${expandAnimation} 0.2s ease forwards;
`;

export const MobileColumnMenuItem = styled.div`
  padding: 8px 12px;
  border-radius: ${({ theme }) => theme.borderRadius};
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.hoverBg};
  }
`;
