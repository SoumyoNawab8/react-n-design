'use client';
import styled, { css } from 'styled-components';

const sizes = {
  small: css`
    padding: 2px;
    & > button {
      padding: 4px 12px;
      font-size: 12px;
    }
  `,
  medium: css`
    padding: 4px;
    & > button {
      padding: 6px 16px;
      font-size: 14px;
    }
  `,
  large: css`
    padding: 4px;
    & > button {
      padding: 8px 20px;
      font-size: 16px;
    }
  `,
};

export const SegmentedWrapper = styled.div<{ $size: string; $block: boolean }>`
  display: inline-flex;
  background: ${({ theme }) => theme.colors?.backgroundSecondary || '#f5f5f5'};
  border-radius: ${({ theme }) => theme.borderRadius || '6px'};
  ${({ $size }) => sizes[$size as keyof typeof sizes]}
  
  ${({ $block }) => $block && css`
    display: flex;
    width: 100%;
  `}
`;

export const SegmentedItem = styled.button<{
  $active: boolean;
  $size: string;
  $block: boolean;
}>`
  position: relative;
  border: none;
  background: transparent;
  color: ${({ theme, $active }) => 
    $active ? theme.colors?.text : theme.colors?.textSecondary || '#999'
  };
  cursor: ${({ $active }) => $active ? 'default' : 'pointer'};
  border-radius: 4px;
  font-weight: ${({ $active }) => $active ? '500' : '400'};
  transition: color 0.2s;
  flex: ${({ $block }) => $block ? '1' : '0 0 auto'};
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors?.primary || '#1890ff'};
    outline-offset: -2px;
  }
`;
