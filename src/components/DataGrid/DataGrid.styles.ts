'use client';
import styled, { css, keyframes } from 'styled-components';

const skeletonPulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

export const GridWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  overflow: hidden;
  outline: none;
`;

export const GridHeaderContainer = styled.div`
  overflow-x: auto;
  overflow-y: hidden;
  background: ${({ theme }) => theme.colors.cardBg};
  box-shadow: ${({ theme }) => theme.shadows.softInset};
  border-bottom: 1px solid ${({ theme }) => theme.colors.shadowDark}40;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
`;

export const GridHeaderRow = styled.div`
  display: flex;
  min-width: max-content;
`;

export const GridHeaderCell = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isSortable', 'isSorted', 'width'].includes(prop),
})<{
  isSortable?: boolean;
  isSorted?: boolean;
  width?: number;
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
  ${({ isSortable, theme }) =>
    isSortable &&
    css`
      &:hover {
        color: ${theme.colors.primary};
      }
    `}
`;

export const ResizeHandle = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  cursor: col-resize;
  background: transparent;
  z-index: 2;
  &:hover {
    background: ${({ theme }) => theme.colors.primary};
  }
`;

export const SortIconWrapper = styled.span`
  display: inline-flex;
  margin-left: 8px;
  opacity: 0.6;
  font-size: 0.85em;
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
  &:focus {
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}40;
  }
`;

export const GridBodyWrapper = styled.div`
  flex: 1;
  overflow: hidden;
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
  background: ${({ theme, isSelected }) => (isSelected ? `${theme.colors.primary}15` : theme.colors.background)};
  transition: background-color 0.2s;
  border-bottom: 1px solid ${({ theme }) => theme.colors.shadowDark}20;
  &:hover {
    background: ${({ theme, isSelected }) => (isSelected ? `${theme.colors.primary}25` : theme.colors.hoverBg)};
  }
`;

export const GridCellsRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const GridCell = styled.div.withConfig({
  shouldForwardProp: (prop) => !['width', 'isActive'].includes(prop),
})<{
  width?: number;
  isActive?: boolean;
}>`
  flex-shrink: 0;
  width: ${({ width }) => (width ? `${width}px` : '150px')};
  min-width: ${({ width }) => (width ? `${width}px` : '150px')};
  padding: 12px 16px;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  outline: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  ${({ isActive, theme }) =>
    isActive &&
    css`
      box-shadow: inset 0 0 0 2px ${theme.colors.primary}80;
    `}
`;

export const ExpandIconWrapper = styled.button`
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  color: inherit;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius};
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const ExpandableContent = styled.div`
  padding: 16px;
  background: ${({ theme }) => theme.colors.cardBg};
  color: ${({ theme }) => theme.colors.text};
  width: 100%;
  box-shadow: ${({ theme }) => theme.shadows.softInset};
`;

export const EmptyState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.6;
  font-size: 1rem;
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
  background: ${({ theme }) => theme.colors.skeletonBg};
  min-height: 24px;
  animation: ${skeletonPulse} 1.5s ease-in-out infinite;
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
