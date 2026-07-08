'use client';
import styled from 'styled-components';
import { iconColor } from '../../styles/iconColor';

export const FloatButtonWrapper = styled.div<{ $position: string }>`
  position: fixed;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  
  ${({ $position }) => {
    switch ($position) {
      case 'bottom-right':
        return 'bottom: 24px; right: 24px; align-items: flex-end;';
      case 'bottom-left':
        return 'bottom: 24px; left: 24px; align-items: flex-start;';
      case 'top-right':
        return 'top: 24px; right: 24px; align-items: flex-end; flex-direction: column-reverse;';
      case 'top-left':
        return 'top: 24px; left: 24px; align-items: flex-start; flex-direction: column-reverse;';
      default:
        return 'bottom: 24px; right: 24px;';
    }
  }}
`;

export const FloatButtonContainer = styled.button`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: none;
  background: ${({ theme }) => theme.colors?.primary || '#1890ff'};
  color: ${({ theme }) => theme.colors?.background || '#ffffff'};
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: box-shadow 0.2s;
  ${iconColor}

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors?.primary || '#1890ff'};
    outline-offset: 2px;
  }
`;

export const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 8px;
`;

export const MenuItem = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: ${({ theme }) => theme.colors?.background || '#ffffff'};
  border: 1px solid ${({ theme }) => theme.colors?.border || '#d9d9d9'};
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  color: ${({ theme }) => theme.colors?.text || '#333'};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors?.hoverBg || '#f5f5f5'};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
