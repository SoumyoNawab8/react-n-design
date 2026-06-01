import styled, { css, keyframes } from 'styled-components';

// --- Animations ---
const spin = keyframes`to { transform: rotate(360deg); }`;

export const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

export const sortPulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
`;

// --- Container Wrapper ---
export const TableContainer = styled.div`
  position: relative;
  width: 100%;
  overflow-x: auto;
  border-radius: ${({ theme }) => theme.borderRadius};
  /* Scroll shadow effect for horizontal overflow */
  background:
    linear-gradient(to right, ${({ theme }) => theme.colors.background} 30%, transparent),
    linear-gradient(to left, ${({ theme }) => theme.colors.background} 30%, transparent),
    linear-gradient(to right, ${({ theme }) => theme.colors.shadowDark}20, transparent 30%),
    linear-gradient(to left, ${({ theme }) => theme.colors.shadowDark}20, transparent 30%);
  background-position: left center, right center, left center, right center;
  background-repeat: no-repeat;
  background-size: 20px 100%, 20px 100%, 20px 100%, 20px 100%;
  background-attachment: local, local, scroll, scroll;
`;

export const TableWrapper = styled.div<{ $stickyHeader?: boolean }>`
  position: relative;
  width: 100%;
  padding: 8px;
  background: ${({ theme }) => theme.colors.background};
  box-shadow: ${({ theme }) => theme.shadows.softInset};
  border-radius: ${({ theme }) => theme.borderRadius};
  overflow: ${({ $stickyHeader }) => ($stickyHeader ? 'auto' : 'visible')};
  max-height: ${({ $stickyHeader }) => ($stickyHeader ? '400px' : 'none')};
  
  @media (max-width: 768px) {
    padding: 4px;
  }
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  min-width: max-content; /* Ensure table doesn't shrink below content width */
`;

export const TableHeader = styled.thead<{ $stickyHeader?: boolean }>`
  ${({ $stickyHeader }) =>
    $stickyHeader &&
    css`
      position: sticky;
      top: 0;
      z-index: 5;
    `}
`;

// --- Row with hover transition ---
export const TableRow = styled.tr`
  transition: background-color 0.2s ease, transform 0.15s ease;
  
  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.shadowDark}40;
  }
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.hoverBg};
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  /* Hidden columns - responsive */
  @media (max-width: 576px) {
    &.hide-sm {
      display: none;
    }
  }
  
  @media (min-width: 577px) and (max-width: 768px) {
    &.hide-md {
      display: none;
    }
  }
  
  @media (min-width: 769px) and (max-width: 992px) {
    &.hide-lg {
      display: none;
    }
  }
`;

export const TableRowClickable = styled(TableRow)`
  cursor: pointer;
`;

export const TableCell = styled.td<{
  $hiddenSm?: boolean;
  $hiddenMd?: boolean;
  $hiddenLg?: boolean;
}>`
  padding: 16px;
  text-align: left;
  color: ${({ theme }) => theme.colors.text};
  vertical-align: middle;
  
  /* Responsive padding */
  @media (max-width: 768px) {
    padding: 12px 8px;
  }
  
  /* Responsive column hiding */
  @media (max-width: 576px) {
    ${({ $hiddenSm }) =>
      $hiddenSm &&
      css`
        display: none;
      `}
  }
  
  @media (min-width: 577px) and (max-width: 768px) {
    ${({ $hiddenMd }) =>
      $hiddenMd &&
      css`
        display: none;
      `}
  }
  
  @media (min-width: 769px) and (max-width: 992px) {
    ${({ $hiddenLg }) =>
      $hiddenLg &&
      css`
        display: none;
      `}
  }
`;

// --- Sort Icon with animation ---
export const SortIcon = styled.span.withConfig({
  shouldForwardProp: (prop) => !['isActive', 'isAscending'].includes(prop),
})<{ isActive: boolean; isAscending: boolean }>`
  display: inline-flex;
  flex-direction: column;
  margin-left: 8px;
  color: ${({ theme }) => theme.colors.shadowDark};
  font-size: 0.8em;
  transition: transform 0.2s ease;
  
  ${({ isActive }) =>
    isActive &&
    css`
      animation: ${sortPulse} 0.3s ease;
    `}
  
  & svg:first-child { /* Up arrow */
    opacity: ${({ isActive, isAscending }) => (isActive && isAscending ? 1 : 0.3)};
    color: ${({ isActive, isAscending, theme }) => (isActive && isAscending ? theme.colors.primary : 'inherit')};
  }
  
  & svg:last-child { /* Down arrow */
    opacity: ${({ isActive, isAscending }) => (isActive && !isAscending ? 1 : 0.3)};
    color: ${({ isActive, isAscending, theme }) => (isActive && !isAscending ? theme.colors.primary : 'inherit')};
  }
`;

// --- Header Cell with responsive hiding ---
export const TableHeaderCell = styled.th.withConfig({
  shouldForwardProp: (prop) => !['isSortable', '$hiddenSm', '$hiddenMd', '$hiddenLg'].includes(prop),
})<{
  isSortable: boolean;
  $hiddenSm?: boolean;
  $hiddenMd?: boolean;
  $hiddenLg?: boolean;
}>`
  padding: 16px;
  text-align: left;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  white-space: nowrap;
  background: ${({ theme }) => theme.colors.background};
  border-bottom: 2px solid ${({ theme }) => `${theme.colors.shadowDark}40`};
  
  /* Responsive padding */
  @media (max-width: 768px) {
    padding: 12px 8px;
  }
  
  ${({ isSortable, theme }) =>
    isSortable &&
    css`
      cursor: pointer;
      transition: color 0.2s ease, background-color 0.2s ease;
      
      &:hover {
        color: ${theme.colors.primary};
        background-color: ${theme.colors.hoverBg};
        
        & ${SortIcon} {
          color: ${theme.colors.primary};
        }
      }
    `}
  
  /* Responsive column hiding */
  @media (max-width: 576px) {
    ${({ $hiddenSm }) =>
      $hiddenSm &&
      css`
        display: none;
      `}
  }
  
  @media (min-width: 577px) and (max-width: 768px) {
    ${({ $hiddenMd }) =>
      $hiddenMd &&
      css`
        display: none;
      `}
  }
  
  @media (min-width: 769px) and (max-width: 992px) {
    ${({ $hiddenLg }) =>
      $hiddenLg &&
      css`
        display: none;
      `}
  }
`;

// --- Pagination ---
export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
  padding: 16px 0 8px;

  /* Touch-optimized for mobile */
  @media (max-width: 768px) {
    justify-content: center;
    gap: 8px;
    padding: 12px 0;

    button {
      min-height: 44px;
      min-width: 44px;
      padding: 8px 16px;
    }
  }
`;

export const PaginationInfo = styled.span`
  color: ${({ theme }) => theme.colors.text}40;
  font-size: 0.9em;
  
  @media (max-width: 768px) {
    font-size: 0.85em;
  }
`;

// --- Loading Spinner ---
export const Spinner = styled.div`
  border: 3px solid ${({ theme }) => `${theme.colors.shadowDark}40`};
  border-top-color: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  width: 2.5em;
  height: 2.5em;
  animation: ${spin} 1s linear infinite;
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

// --- Skeleton Loading ---
export const SkeletonRow = styled.tr`
  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.shadowDark}20;
  }
`;

export const SkeletonCell = styled.td<{ $hiddenSm?: boolean; $hiddenMd?: boolean; $hiddenLg?: boolean }>`
  padding: 16px;
  
  @media (max-width: 768px) {
    padding: 12px 8px;
  }
  
  @media (max-width: 576px) {
    ${({ $hiddenSm }) =>
      $hiddenSm &&
      css`
        display: none;
      `}
  }
  
  @media (min-width: 577px) and (max-width: 768px) {
    ${({ $hiddenMd }) =>
      $hiddenMd &&
      css`
        display: none;
      `}
  }
  
  @media (min-width: 769px) and (max-width: 992px) {
    ${({ $hiddenLg }) =>
      $hiddenLg &&
      css`
        display: none;
      `}
  }
`;

export const SkeletonLine = styled.div<{ $width?: string }>`
  height: 16px;
  width: ${({ $width }) => $width || '80%'};
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.shadowDark}20 0%,
    ${({ theme }) => theme.colors.shadowDark}40 50%,
    ${({ theme }) => theme.colors.shadowDark}20 100%
  );
  background-size: 200% 100%;
  border-radius: 4px;
  animation: ${shimmer} 1.5s ease-in-out infinite;
`;

// --- Empty State ---
export const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  text-align: center;
  color: ${({ theme }) => theme.colors.text}60;
`;

export const EmptyStateIcon = styled.div`
  width: 64px;
  height: 64px;
  margin-bottom: 16px;
  color: ${({ theme }) => theme.colors.shadowDark}60;
  
  svg {
    width: 100%;
    height: 100%;
  }
`;

export const EmptyStateTitle = styled.h3`
  margin: 0 0 8px;
  font-size: 1.1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
`;

export const EmptyStateDescription = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text}60;
`;
