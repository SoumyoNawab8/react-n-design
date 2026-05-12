'use client';
import styled, { css } from 'styled-components';

export const BreadcrumbsNav = styled.nav`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
`;

export const BreadcrumbsList = styled.ol`
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  flex-wrap: wrap;
  gap: 4px;
`;

export const BreadcrumbItem = styled.li`
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;

export const BreadcrumbLink = styled.a.withConfig({
  shouldForwardProp: (prop) => !['isCurrent'].includes(prop),
})<{ isCurrent?: boolean }>`
  color: ${({ isCurrent, theme }) => (isCurrent ? theme.colors.text : theme.colors.primary)};
  text-decoration: none;
  font-weight: ${({ isCurrent }) => (isCurrent ? '600' : '400')};
  cursor: ${({ isCurrent }) => (isCurrent ? 'default' : 'pointer')};
  padding: 4px 8px;
  border-radius: ${({ theme }) => theme.borderRadius};
  transition: all 0.2s ease-in-out;

  &:hover:not([aria-current="page"]) {
    color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => (theme as any).colors.hoverBg};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

export const BreadcrumbSeparator = styled.span`
  display: inline-flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.5;
  user-select: none;
`;
