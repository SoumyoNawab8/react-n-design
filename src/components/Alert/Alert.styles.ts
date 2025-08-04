import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Theme } from '../../styles/theme';

// Helper function to get theme-aware colors
const getAlertColors = (theme: Theme, alertType: 'success' | 'info' | 'warning' | 'error') => {
  const isDark = theme.name === 'dark';
  switch (alertType) {
    case 'success':
      return {
        bg: isDark ? '#1A3C2D' : '#E6F7F0',
        color: '#28a745',
      };
    case 'info':
      return {
        bg: isDark ? '#1A2F6C' : '#E9F5FE',
        color: theme.colors.primary,
      };
    case 'warning':
      return {
        bg: isDark ? '#4D411E' : '#FFFBE6',
        color: '#FAAD14',
      };
    case 'error':
      return {
        bg: isDark ? '#502322' : '#FFF1F0',
        color: '#DC3545',
      };
    default:
      return {
        bg: isDark ? '#1A2F6C' : '#E9F5FE',
        color: theme.colors.primary,
      };
  }
};

export const AlertWrapper = styled(motion.div)<{ alertType: 'success' | 'info' | 'warning' | 'error' }>`
  display: flex;
  align-items: flex-start;
  width: 100%;
  padding: 16px;
  border-radius: ${({ theme }) => theme.borderRadius};
  color: ${({ theme }) => theme.colors.text};

  /* Use the helper function to set theme-aware colors */
  background: ${({ theme, alertType }) => getAlertColors(theme, alertType).bg};
  box-shadow: 5px 5px 10px ${({ theme, alertType }) => getAlertColors(theme, alertType).color}20, 
              -5px -5px 10px ${({ theme }) => theme.colors.shadowLight}80;
`;

export const AlertIcon = styled.div`
  margin-right: 12px;
  font-size: 22px;
  margin-top: 2px;
  flex-shrink: 0;
  
  /* The icon's color will be the same as the colored part of the shadow */
  color: ${({ theme, alertType }) => getAlertColors(theme, alertType).color};

  & svg {
    display: block;
  }
`;

export const AlertContent = styled.div`
  flex-grow: 1;
`;

export const AlertMessage = styled.div`
  font-weight: 600;
  font-size: 16px;
  /* Use the main text color from the theme */
  color: ${({ theme }) => theme.colors.text};
`;

export const AlertDescription = styled.div`
  margin-top: 4px;
  font-size: 14px;
`;

export const CloseIcon = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: #aaa;
  margin-left: 16px;
  font-size: 16px;
  flex-shrink: 0;
  
  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;