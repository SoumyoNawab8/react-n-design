import styled, { css, keyframes } from 'styled-components';

export const TableWrapper = styled.div`
  position: relative;
  width: 100%;
  /* 2. Access theme from props */
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 8px;
  background: ${({ theme }) => theme.colors.background};
  box-shadow: ${({ theme }) => (theme as any).shadows.softInset};
  overflow-x: auto; /* Allow horizontal scrolling for wide tables */
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHeader = styled.thead``;

export const TableRow = styled.tr`
  transition: background-color 0.2s;
  &:not(:last-child) {
    /* 3. Use theme-aware border color */
    border-bottom: 1px solid ${({ theme }) => (theme as any).colors.shadowDark}40;
  }
  &:hover {
    /* 4. Use theme-aware hover color */
    background-color: ${({ theme }) => (theme as any).colors.hoverBg};
  }
`;

export const TableCell = styled.td`
  padding: 16px;
  text-align: left;
  color: ${({ theme }) => theme.colors.text};
`;

export const SortIcon = styled.span<{ isActive: boolean; isAscending: boolean }>`
  display: inline-flex;
  flex-direction: column;
  margin-left: 8px;
  color: #aaa;
  font-size: 0.8em;
  
  & svg:first-child { /* Up arrow */
    opacity: ${({ isActive, isAscending }) => (isActive && isAscending ? 1 : 0.3)};
    color: ${({ isActive, isAscending, theme }) => (isActive && isAscending ? theme.colors.primary : 'inherit')};
  }
  & svg:last-child { /* Down arrow */
    opacity: ${({ isActive, isAscending }) => (isActive && !isAscending ? 1 : 0.3)};
    color: ${({ isActive, isAscending, theme }) => (isActive && !isAscending ? theme.colors.primary : 'inherit')};
  }
`;

export const TableHeaderCell = styled.th<{ isSortable: boolean }>`
  padding: 16px;
  text-align: left;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  white-space: nowrap;

  ${({ isSortable, theme }) =>
    isSortable &&
    css`
      cursor: pointer;
      &:hover {
        color: ${theme.colors.primary};
        & ${SortIcon} {
          color: ${theme.colors.primary};
        }
      }
    `}
`;

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
  padding: 16px 8px 8px;
`;

// --- Re-usable Spinner ---
const spin = keyframes`to { transform: rotate(360deg); }`;
export const Spinner = styled.div`
  border: 3px solid rgba(0, 0, 0, 0.2);
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
  /* 5. Use theme-aware background for the overlay */
  background: ${({ theme }) => theme.colors.background}b3; /* b3 is ~70% opacity */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  border-radius: ${({ theme }) => theme.borderRadius};
`;