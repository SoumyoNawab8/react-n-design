import styled from 'styled-components';

export const BoardContainer = styled.div`
  display: flex;
  gap: 24px;
  overflow-x: auto;
  padding: 16px;
  min-height: 400px;

  /* Smooth horizontal scrolling */
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    height: 8px;
  }
  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.background};
    border-radius: ${({ theme }) => theme.borderRadius};
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.shadowDark};
    border-radius: ${({ theme }) => theme.borderRadius};
  }

  @media (prefers-reduced-motion: reduce) {
    scroll-behavior: auto;
  }
`;

export const ColumnContainer = styled.div`
  flex: 0 0 300px;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  scroll-snap-align: start;
`;

export const ColumnHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  margin-bottom: 12px;
  border-radius: ${({ theme }) => theme.borderRadius};
  background: ${({ theme }) => theme.colors.cardBg};
  box-shadow: ${({ theme }) => theme.shadows.soft};
`;

export const ColumnTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

export const ColumnCount = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 28px;
  height: 28px;
  padding: 0 8px;
  border-radius: 14px;
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.background};
  box-shadow: ${({ theme }) => theme.shadows.softInset};
`;

export const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 4px;
`;

export const TaskCard = styled.div`
  padding: 16px;
  border-radius: ${({ theme }) => theme.borderRadius};
  background: ${({ theme }) => theme.colors.cardBg};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.strong};
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const TaskTitle = styled.h4`
  margin: 0 0 8px 0;
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

export const TaskDescription = styled.p`
  margin: 0 0 12px 0;
  font-size: 13px;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const TaskTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 12px;
`;

export const Tag = styled.span`
  display: inline-block;
  padding: 4px 8px;
  border-radius: ${({ theme }) => theme.borderRadius};
  font-size: 11px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.background};
  box-shadow: ${({ theme }) => theme.shadows.softInset};
`;

export const TaskActions = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`;

export const ActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    box-shadow: ${({ theme }) => theme.shadows.softInset};
    transform: translateY(0);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
    box-shadow: ${({ theme }) => theme.shadows.softInset};
    color: ${({ theme }) => theme.colors.disabledText};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;
