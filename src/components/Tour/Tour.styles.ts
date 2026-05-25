'use client';
import styled from 'styled-components';

export const TourOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

export const TourSpotlight = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius || '8px'};
  box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.5);
`;

export const TourCard = styled.div`
  background: white;
  border-radius: ${({ theme }) => theme.borderRadius || '8px'};
  padding: 20px;
  max-width: 320px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  
  h3 {
    margin: 0 0 8px;
    font-size: 16px;
    font-weight: 600;
  }
  
  p {
    margin: 0 0 16px;
    font-size: 14px;
    color: ${({ theme }) => theme.colors?.textSecondary || '#666'};
  }
  
  .indicators {
    display: flex;
    justify-content: center;
    gap: 6px;
    margin-top: 12px;
    
    span {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: ${({ theme }) => theme.colors?.border || '#d9d9d9'};
    }
    
    span.active {
      background: ${({ theme }) => theme.colors?.primary || '#1890ff'};
    }
  }
`;

export const TourArrow = styled.div<{ $placement: string }>`
  position: absolute;
  width: 0;
  height: 0;
  border: 8px solid transparent;
  
  ${({ $placement }) => {
    switch ($placement) {
      case 'top':
        return `
          bottom: -16px;
          left: 50%;
          transform: translateX(-50%);
          border-top-color: white;
        `;
      case 'bottom':
        return `
          top: -16px;
          left: 50%;
          transform: translateX(-50%);
          border-bottom-color: white;
        `;
      case 'left':
        return `
          right: -16px;
          top: 50%;
          transform: translateY(-50%);
          border-left-color: white;
        `;
      case 'right':
        return `
          left: -16px;
          top: 50%;
          transform: translateY(-50%);
          border-right-color: white;
        `;
      default:
        return '';
    }
  }}
`;

export const TourButtons = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  
  button {
    padding: 6px 12px;
    border: 1px solid ${({ theme }) => theme.colors?.border || '#d9d9d9'};
    background: white;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    
    &:hover {
      border-color: ${({ theme }) => theme.colors?.primary || '#1890ff'};
      color: ${({ theme }) => theme.colors?.primary || '#1890ff'};
    }
    
    &.primary {
      background: ${({ theme }) => theme.colors?.primary || '#1890ff'};
      border-color: ${({ theme }) => theme.colors?.primary || '#1890ff'};
      color: white;
      
      &:hover {
        opacity: 0.9;
      }
    }
  }
`;
