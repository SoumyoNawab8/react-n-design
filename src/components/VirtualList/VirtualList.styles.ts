'use client';
import styled from 'styled-components';

export const VirtualListContainer = styled.div<{ $height: number }>`
  position: relative;
  overflow-y: auto;
  width: 100%;
  height: ${({ $height }) => $height}px;
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  box-sizing: border-box;
`;

export const VirtualListContent = styled.div<{ $totalHeight: number }>`
  position: relative;
  width: 100%;
  height: ${({ $totalHeight }) => $totalHeight}px;
`;

export const VirtualListItem = styled.div<{
  $top: number;
  $height: number;
  $isSticky: boolean;
}>`
  position: absolute;
  top: ${({ $top }) => $top}px;
  left: 0;
  width: 100%;
  height: ${({ $height }) => $height}px;
  box-sizing: border-box;
  ${({ $isSticky }) =>
    $isSticky &&
    `
    z-index: 1;
  `}
`;
