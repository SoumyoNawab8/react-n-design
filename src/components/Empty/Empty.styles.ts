'use client';
import styled from 'styled-components';

export const EmptyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 32px;
  text-align: center;
`;

export const EmptyImage = styled.div`
  margin-bottom: 16px;
  color: ${({ theme }) => theme.colors?.textSecondary || '#999'};
  & svg {
    display: block;
    margin: 0 auto;
  }
`;

export const EmptyDescription = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors?.textSecondary || '#999'};
  font-size: 14px;
  line-height: 1.5;
`;
